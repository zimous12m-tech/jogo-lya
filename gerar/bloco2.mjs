import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};

w('src/content/schema.ts', `import { z } from 'zod';

export const TOPICOS = ['numeros','fracoes','decimais','percentagens','inteiros','potencias','proporcionalidade','equacoes','geometria','estatistica','probabilidades','logica'] as const;
export const WORLD_IDS = ['mundo-1','mundo-2','mundo-3','mundo-4','mundo-5','mundo-6'] as const;

export const worldIdSchema = z.enum(WORLD_IDS);

export const localizedTextSchema = z.object({
  'pt-PT': z.string().min(1),
  en: z.string().min(1),
  'pt-BR': z.string().min(1).optional(),
  es: z.string().min(1).optional()
});

const fractionSchema = z.object({ n: z.number().int().min(1), d: z.number().int().min(2) });

export const visualSchema = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('pizza'), fatias: z.number().int().min(2).max(12), comidas: z.number().int().min(1) }),
  z.object({ tipo: z.literal('fracaoComparada'), a: fractionSchema, b: fractionSchema }),
  z.object({ tipo: z.literal('desconto'), precoCentimos: z.number().int().positive(), percentagem: z.number().int().min(1).max(90) })
]);

export const questionSchema = z.object({
  id: z.string().regex(/^[a-z]+-[a-z]+-\\d{4}$/),
  worldId: worldIdSchema,
  topico: z.enum(TOPICOS),
  subtipo: z.string().min(1),
  dificuldade: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  curriculo: z.array(z.string().min(1)).min(1),
  pergunta: localizedTextSchema,
  visual: visualSchema.optional(),
  opcoes: z.array(z.string().min(1)).min(2).max(4),
  resposta: z.number().int().min(0),
  explicacao: localizedTextSchema,
  tempoSugerido: z.number().int().min(5).max(180),
  tags: z.array(z.string().min(1)).min(1)
}).superRefine((q, ctx) => {
  if (q.resposta >= q.opcoes.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['resposta'], message: 'resposta fora das opcoes' });
  if (new Set(q.opcoes).size !== q.opcoes.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['opcoes'], message: 'opcoes duplicadas' });
});

export const worldSchema = z.object({
  id: worldIdSchema,
  ordem: z.number().int().min(1).max(6),
  nome: localizedTextSchema,
  descricao: localizedTextSchema,
  tema: z.enum(['numeros','fracoes','geometria','percentagens','estatistica','logica']),
  cor: z.string().regex(/^#[0-9a-f]{6}$/),
  corSuave: z.string().regex(/^#[0-9a-f]{6}$/),
  icone: z.string().min(1),
  topicos: z.array(z.enum(TOPICOS)).min(1)
});

export const levelSchema = z.object({
  id: z.string().regex(/^mundo-[1-6]-nivel-[1-6]$/),
  worldId: worldIdSchema,
  titulo: localizedTextSchema,
  boss: z.boolean(),
  tempoSugerido: z.number().int().min(30).max(600),
  questionIds: z.array(z.string()).min(1).max(10)
});

export type Question = z.infer<typeof questionSchema>;
export type Visual = z.infer<typeof visualSchema>;
export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type World = z.infer<typeof worldSchema>;
export type Level = z.infer<typeof levelSchema>;
export type WorldId = z.infer<typeof worldIdSchema>;
`);

w('src/content/worlds.ts', `import { levelSchema, questionSchema, worldSchema } from './schema';
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
`);

w('scripts/lib.mjs', `let seed = 20261110;

export const setSeed = (value) => {
  seed = value;
};

export const rnd = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

export const int = (min, max) => min + Math.floor(rnd() * (max - min + 1));
export const pick = (list) => list[Math.floor(rnd() * list.length)];
export const pt = (value) => String(value).replace('.', ',');

export const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

export const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export function build(correct, wrongs, near) {
  const options = [String(correct), ...wrongs.map(String), String(near)];
  assert(options.length === 4, 'esperava 4 opcoes');
  assert(new Set(options).size === 4, 'opcoes colidem: ' + options.join(' | '));
  const shuffled = shuffle(options);
  return { opcoes: shuffled, resposta: shuffled.indexOf(String(correct)) };
}
`);

w('scripts/generate-content.mjs', `import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as h from './lib.mjs';

const ROOT = 'src/content/mundos';
const PER_TEMPLATE = 8;
const DIFICULDADES = [1, 1, 2, 2, 2, 3, 3, 3];

const GRUPOS = [
  ['num-nat', 'numeros', 'mundo-1'],
  ['num-int', 'inteiros', 'mundo-1'],
  ['fra-add', 'fracoes', 'mundo-2'],
  ['fra-comp', 'fracoes', 'mundo-2'],
  ['fra-mult', 'fracoes', 'mundo-2'],
  ['equ-res', 'equacoes', 'mundo-2'],
  ['geo-are', 'geometria', 'mundo-3'],
  ['pot-cal', 'potencias', 'mundo-3'],
  ['per-cal', 'percentagens', 'mundo-4'],
  ['pro-dir', 'proporcionalidade', 'mundo-4'],
  ['est-med', 'estatistica', 'mundo-5'],
  ['prob-cal', 'probabilidades', 'mundo-5'],
  ['log-pro', 'logica', 'mundo-6'],
  ['dec-ope', 'decimais', 'mundo-6']
];

export async function carregarTemplates() {
  const map = new Map();
  for (const [prefixo] of GRUPOS) {
    const modulo = await import('./templates/' + prefixo + '.mjs');
    map.set(prefixo, modulo.default);
  }
  return map;
}

export function gerarExercicio(prefixo, template, dificuldade, indice) {
  const base = template(h, dificuldade);
  h.assert(base.pt && base.en, prefixo + ': enunciado vazio');
  h.assert(base.ep && base.ee, prefixo + ': explicacao vazia');
  h.assert(Array.isArray(base.wrongs) && base.wrongs.length === 2, prefixo + ': precisa de 2 distratores');
  h.assert(base.near !== undefined, prefixo + ': falta distrator adjacente');
  for (const wrong of base.wrongs) h.assert(String(wrong) !== String(base.correct), prefixo + ': distrator igual a resposta');
  h.assert(String(base.near) !== String(base.correct), prefixo + ': adjacente igual a resposta');

  const { opcoes, resposta } = h.build(base.correct, base.wrongs, base.near);
  const id = prefixo + '-' + String(indice).padStart(4, '0');

  return {
    id,
    subtipo: base.subtipo,
    dificuldade,
    pergunta: { 'pt-PT': base.pt, en: base.en },
    ...(base.visual ? { visual: base.visual } : {}),
    opcoes,
    resposta,
    explicacao: { 'pt-PT': base.ep, en: base.ee },
    tempoSugerido: 20 + dificuldade * 15,
    tags: [prefixo, 'gerado']
  };
}

function escreverNiveis(mundo, index) {
  const dir = join(ROOT, mundo);
  for (let nivel = 1; nivel <= 5; nivel += 1) {
    const ids = index.slice((nivel - 1) * 5, nivel * 5);
    h.assert(ids.length === 5, mundo + ': nivel ' + nivel + ' sem ids');
    writeFileSync(join(dir, 'nivel-' + nivel + '.json'), JSON.stringify({
      id: mundo + '-nivel-' + nivel,
      worldId: mundo,
      titulo: { 'pt-PT': 'Nivel ' + nivel, en: 'Level ' + nivel },
      boss: false,
      tempoSugerido: 150 + nivel * 15,
      questionIds: ids
    }, null, 2) + '\\n');
  }
  const boss = index.slice(-8);
  h.assert(boss.length === 8, mundo + ': boss sem ids');
  writeFileSync(join(dir, 'nivel-6.json'), JSON.stringify({
    id: mundo + '-nivel-6',
    worldId: mundo,
    titulo: { 'pt-PT': 'Boss', en: 'Boss' },
    boss: true,
    tempoSugerido: 160,
    questionIds: boss
  }, null, 2) + '\\n');
}

export async function gerarTudo() {
  h.setSeed(20261110);
  const templates = await carregarTemplates();
  let total = 0;

  for (const [prefixo, topico, mundo] of GRUPOS) {
    const dir = join(ROOT, mundo, 'questoes');
    mkdirSync(dir, { recursive: true });
    const lista = templates.get(prefixo);
    h.assert(lista && lista.length === 3, prefixo + ': precisa de 3 templates');

    let indice = 0;
    for (const template of lista) {
      for (let i = 0; i < PER_TEMPLATE; i += 1) {
        indice += 1;
        const exercicio = gerarExercicio(prefixo, template, DIFICULDADES[i], indice);
        writeFileSync(join(dir, exercicio.id + '.json'), JSON.stringify({
          ...exercicio,
          worldId: mundo,
          topico,
          curriculo: ['PT_6ano_MAT_' + topico.toUpperCase()]
        }, null, 2) + '\\n');
        total += 1;
      }
    }
  }

  for (const mundo of ['mundo-1','mundo-2','mundo-3','mundo-4','mundo-5','mundo-6']) {
    const prefixos = GRUPOS.filter(([, , m]) => m === mundo).map(([p]) => p);
    const ids = prefixos.flatMap((prefixo) =>
      Array.from({ length: PER_TEMPLATE * 3 }, (_, i) => prefixo + '-' + String(i + 1).padStart(4, '0'))
    );
    const ordenado = ids.slice().sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
    writeFileSync(join(ROOT, mundo, 'index.json'), JSON.stringify(ordenado, null, 2) + '\\n');
    escreverNiveis(mundo, ordenado);
  }

  return total;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  gerarTudo().then((total) => console.log('Gerados ' + total + ' exercicios.'));
}
`);

w('scripts/validate-content.ts', `import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { levelSchema, questionSchema } from '../src/content/schema';

const ROOT = 'src/content/mundos';

export function runValidation(): string[] {
  const problems: string[] = [];
  const worlds = readdirSync(ROOT).filter((n) => n.startsWith('mundo-'));
  if (worlds.length !== 6) problems.push('esperava 6 mundos, encontrei ' + worlds.length);

  for (const world of worlds) {
    const dir = join(ROOT, world);
    const files = readdirSync(dir).filter((n) => n.startsWith('nivel-'));
    const regulares = files.filter((n) => n !== 'nivel-6.json');
    if (regulares.length !== 5) problems.push(world + ': esperava 5 niveis');
    if (!files.includes('nivel-6.json')) problems.push(world + ': falta o boss');

    let index: string[] = [];
    try {
      index = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8')) as string[];
    } catch {
      problems.push(world + ': index.json ilegivel');
      continue;
    }
    const indexSet = new Set(index);

    for (const file of files) {
      const parsed = levelSchema.safeParse(JSON.parse(readFileSync(join(dir, file), 'utf8')));
      if (!parsed.success) { problems.push(world + '/' + file + ': schema invalido'); continue; }
      const level = parsed.data;
      const esperado = level.boss ? 8 : 5;
      if (level.questionIds.length !== esperado) problems.push(world + '/' + file + ': esperava ' + esperado);
      if (new Set(level.questionIds).size !== level.questionIds.length) problems.push(world + '/' + file + ': repetidos');
      for (const id of level.questionIds) {
        if (!indexSet.has(id)) problems.push(world + '/' + file + ': ' + id + ' fora do index');
        try {
          const q = questionSchema.safeParse(JSON.parse(readFileSync(join(dir, 'questoes', id + '.json'), 'utf8')));
          if (!q.success) problems.push(world + '/' + file + ': ' + id + ' invalida');
        } catch {
          problems.push(world + '/' + file + ': ' + id + ' nao existe');
        }
      }
    }
  }
  return problems;
}

if (process.argv[1]?.includes('validate-content')) {
  const problems = runValidation();
  if (problems.length) {
    console.error('Falhou com ' + problems.length + ' problema(s):');
    for (const p of problems) console.error(' - ' + p);
    process.exit(1);
  }
  console.log('validate:content OK');
}
`);

console.log('Bloco 2 concluido: schema, carregador, gerador e validador criados.');