import type { Level, WorldId } from '../content/schema';
import type { SaveData } from './save';

export type Stars = 0 | 1 | 2 | 3;

export function computeStars(errors: number): Stars {
  if (errors === 0) return 3;
  if (errors === 1) return 2;
  return 1;
}

export function featherReward(correct: number, stars: Stars): number {
  const bonus = stars === 3 ? 20 : stars === 2 ? 10 : 5;
  return correct * 5 + bonus;
}

export function isLevelUnlocked(save: SaveData, levels: readonly Level[], levelId: string): boolean {
  const position = levels.findIndex((level) => level.id === levelId);
  if (position <= 0) return position === 0;
  const previous = levels[position - 1];
  return previous ? (save.stars[previous.id] ?? 0) >= 1 : false;
}

export function isWorldComplete(save: SaveData, levels: readonly Level[]): boolean {
  return levels.length > 0 && levels.every((level) => (save.stars[level.id] ?? 0) >= 1);
}

export function isWorldUnlocked(save: SaveData, worldId: WorldId, order: readonly WorldId[], byWorld: Readonly<Record<string, readonly Level[]>>): boolean {
  const position = order.indexOf(worldId);
  if (position <= 0) return position === 0;
  const previous = order[position - 1];
  if (!previous) return false;
  return isWorldComplete(save, byWorld[previous] ?? []);
}

export function worldStars(save: SaveData, levels: readonly Level[]): number {
  return levels.reduce((total, level) => total + (save.stars[level.id] ?? 0), 0);
}
