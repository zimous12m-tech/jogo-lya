import { levelSchema, questionSchema, worldSchema } from './schema';
import type { Level, Question, World, WorldId } from './schema';

type Module = { default: unknown };
type Loader = () => Promise<Module>;

const manifests = import.meta.glob<Module>('./mundos/*/manifest.json');
const levels = import.meta.glob<Module>('./mundos/*/nivel-*.json');
const questions = import.meta.glob<Module>('./mundos/*/questoes/*.json');

const worldCache = new Map<string, World>();
const questionCache = new Map<string, Question>();

function parse<T>(schema: { safeParse: (v: unknown) => { success: true; data: T } | { success: false; error: { message: string } } }, raw: unknown, label: string): T {
  const result = schema.safeParse(raw);
  if (!result.success) throw new Error(label + ': ' + result.error.message);
  return result.data;
}

function loader(map: Record<string, Loader>, key: string): Loader {
  const found = map[key];
  if (!found) throw new Error('Ficheiro em falta: ' + key);
  return found;
}

export function loadAllWorldIds(): WorldId[] {
  return Object.keys(manifests)
    .map((key) => key.split('/')[2] ?? '')
    .filter((id): id is WorldId => id.length > 0)
    .sort();
}

export async function loadWorldManifest(worldId: WorldId): Promise<World> {
  const cached = worldCache.get(worldId);
  if (cached) return cached;
  const raw = await loader(manifests, './mundos/' + worldId + '/manifest.json')();
  const world = parse(worldSchema, raw.default, 'manifest ' + worldId);
  worldCache.set(worldId, world);
  return world;
}

export async function loadWorlds(): Promise<World[]> {
  return Promise.all(loadAllWorldIds().map((id) => loadWorldManifest(id)));
}

export async function loadLevels(worldId: WorldId): Promise<Level[]> {
  const prefix = './mundos/' + worldId + '/nivel-';
  const ids = Object.keys(levels).filter((key) => key.startsWith(prefix)).sort();
  return Promise.all(ids.map(async (key) => {
    const raw = await loader(levels, key)();
    return parse(levelSchema, raw.default, 'nivel ' + key);
  }));
}

async function loadQuestion(worldId: WorldId, questionId: string): Promise<Question> {
  const cacheKey = worldId + '/' + questionId;
  const cached = questionCache.get(cacheKey);
  if (cached) return cached;
  const raw = await loader(questions, './mundos/' + worldId + '/questoes/' + questionId + '.json')();
  const question = parse(questionSchema, raw.default, 'questao ' + questionId);
  if (question.worldId !== worldId) throw new Error(questionId + ' pertence a outro mundo');
  questionCache.set(cacheKey, question);
  return question;
}

export async function loadLevelQuestions(worldId: WorldId, levelId: string): Promise<Question[]> {
  const list = await loadLevels(worldId);
  const level = list.find((item) => item.id === levelId);
  if (!level) throw new Error('Nivel inexistente: ' + levelId);
  return Promise.all(level.questionIds.map((id) => loadQuestion(worldId, id)));
}

export async function loadWorldQuestions(worldId: WorldId): Promise<Question[]> {
  const prefix = './mundos/' + worldId + '/questoes/';
  const ids = Object.keys(questions)
    .filter((key) => key.startsWith(prefix))
    .map((key) => (key.split('/').pop() ?? '').replace('.json', ''));
  return Promise.all(ids.map((id) => loadQuestion(worldId, id)));
}
