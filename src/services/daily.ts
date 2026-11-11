import type { Question, WorldId } from '../content/schema';
import { loadWorldQuestions } from '../content/worlds';
import { load, update } from './save';

const hash = (text: string): number => {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) % 1000000007;
  return value;
};

export const todayKey = (): string => new Date().toISOString().slice(0, 10);

export function isDailyAvailable(): boolean {
  const save = load();
  return save.dailyDate !== todayKey() || !save.dailyDone;
}

export async function buildDaily(worldIds: readonly WorldId[]): Promise<Question[]> {
  const pool = (await Promise.all(worldIds.map((id) => loadWorldQuestions(id)))).flat();
  if (pool.length === 0) return [];
  const chosen: Question[] = [];
  const seen = new Set<string>();
  let cursor = hash(todayKey());
  while (chosen.length < 5 && seen.size < pool.length) {
    cursor = (cursor * 31 + 7) % pool.length;
    const question = pool[cursor];
    if (!question || seen.has(question.id)) continue;
    seen.add(question.id);
    chosen.push(question);
  }
  return chosen;
}

export function markDailyDone(): void {
  update((draft) => { draft.dailyDate = todayKey(); draft.dailyDone = true; });
}
