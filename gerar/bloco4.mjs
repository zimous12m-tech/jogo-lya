import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

w('src/services/save.ts', `import { z } from 'zod';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './i18n';

const KEY = 'coruja.save.v3';
const V2 = 'coruja.save.v2';
const V1 = 'coruja.save.v1';

export const starsSchema = z.number().int().min(0).max(3);

const settingsShape = {
  locale: z.enum(SUPPORTED_LOCALES),
  soundEnabled: z.boolean(),
  musicEnabled: z.boolean(),
  timedMode: z.boolean(),
  buttonsOnly: z.boolean(),
  highContrast: z.boolean(),
  dyslexiaFont: z.boolean(),
  fontScale: z.number().int().min(0).max(2),
  readOnlyMode: z.boolean(),
  analyticsConsent: z.boolean()
};

export const saveSchema = z.object({
  version: z.literal(3),
  coins: z.number().int().min(0),
  stars: z.record(z.string(), starsSchema),
  streak: z.number().int().min(0),
  lastPlayedDate: z.string().optional(),
  achievements: z.array(z.string()),
  bossesWon: z.array(z.string()),
  dailyDate: z.string().optional(),
  dailyDone: z.boolean(),
  cosmetics: z.object({
    owned: z.array(z.string()),
    equipped: z.object({ hat: z.string().optional(), colour: z.string().optional() })
  }),
  settings: z.object(settingsShape)
});

const v2Schema = z.object({
  version: z.literal(2),
  coins: z.number().int().min(0),
  stars: z.record(z.string(), starsSchema),
  streak: z.number().int().min(0),
  settings: z.object({
    locale: z.enum(SUPPORTED_LOCALES),
    soundEnabled: z.boolean(),
    timedMode: z.boolean(),
    buttonsOnly: z.boolean()
  })
});

const v1Schema = z.object({
  version: z.literal(1),
  coins: z.number().int().min(0),
  completedLevels: z.array(z.string()),
  settings: z.object({ locale: z.enum(SUPPORTED_LOCALES), soundEnabled: z.boolean() })
});

export type SaveData = z.infer<typeof saveSchema>;
export type Settings = SaveData['settings'];

export const DEFAULT_SAVE: SaveData = {
  version: 3,
  coins: 0,
  stars: {},
  streak: 0,
  achievements: [],
  bossesWon: [],
  dailyDone: false,
  cosmetics: { owned: ['chapeu-nenhum', 'cor-baia'], equipped: {} },
  settings: {
    locale: DEFAULT_LOCALE, soundEnabled: true, musicEnabled: true, timedMode: true,
    buttonsOnly: false, highContrast: false, dyslexiaFont: false, fontScale: 0,
    readOnlyMode: false, analyticsConsent: false
  }
};

function base(partial: Partial<Settings>): Settings {
  return { ...DEFAULT_SAVE.settings, ...partial };
}

export function migrateV2(raw: unknown): SaveData | null {
  const parsed = v2Schema.safeParse(raw);
  if (!parsed.success) return null;
  return {
    ...structuredClone(DEFAULT_SAVE),
    coins: parsed.data.coins,
    stars: parsed.data.stars,
    streak: parsed.data.streak,
    settings: base({
      locale: parsed.data.settings.locale,
      soundEnabled: parsed.data.settings.soundEnabled,
      timedMode: parsed.data.settings.timedMode,
      buttonsOnly: parsed.data.settings.buttonsOnly
    })
  };
}

export function migrateV1(raw: unknown): SaveData | null {
  const parsed = v1Schema.safeParse(raw);
  if (!parsed.success) return null;
  const stars: Record<string, number> = {};
  for (const id of parsed.data.completedLevels) stars[id] = 3;
  return {
    ...structuredClone(DEFAULT_SAVE),
    coins: parsed.data.coins,
    stars,
    settings: base({ locale: parsed.data.settings.locale, soundEnabled: parsed.data.settings.soundEnabled })
  };
}

function store(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

function raw(key: string): unknown {
  const s = store();
  if (!s) return null;
  const value = s.getItem(key);
  if (!value) return null;
  try { return JSON.parse(value) as unknown; } catch { return null; }
}

export function load(): SaveData {
  const s = store();
  if (!s) return structuredClone(DEFAULT_SAVE);
  const current = saveSchema.safeParse(raw(KEY));
  if (current.success) return current.data;
  const migrations: Array<[string, (v: unknown) => SaveData | null]> = [[V2, migrateV2], [V1, migrateV1]];
  for (const [key, migrate] of migrations) {
    const migrated = migrate(raw(key));
    if (migrated) { write(migrated); s.removeItem(key); return migrated; }
  }
  return structuredClone(DEFAULT_SAVE);
}

export function write(data: SaveData): SaveData {
  const s = store();
  if (s) s.setItem(KEY, JSON.stringify(data));
  return data;
}

export function update(change: (draft: SaveData) => void): SaveData {
  const draft = structuredClone(load());
  change(draft);
  return write(draft);
}

export function addCoins(amount: number): SaveData {
  return update((d) => { d.coins = Math.max(0, d.coins + amount); });
}

export function saveSettings(change: Partial<Settings>): SaveData {
  return update((d) => { d.settings = { ...d.settings, ...change }; });
}

export function recordLevelResult(levelId: string, stars: number): SaveData {
  return update((d) => {
    d.stars[levelId] = Math.max(d.stars[levelId] ?? 0, Math.min(3, Math.max(1, stars)));
  });
}
`);

w('src/services/i18n.ts', `import i18next from 'i18next';
import ptPT from '../locales/pt-PT.json';
import ptBR from '../locales/pt-BR.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import type { LocalizedText } from '../content/schema';

export const SUPPORTED_LOCALES = ['pt-PT', 'pt-BR', 'en', 'es'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt-PT';

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export async function initI18n(locale: Locale): Promise<void> {
  await i18next.init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    resources: {
      'pt-PT': { translation: ptPT },
      'pt-BR': { translation: ptBR },
      en: { translation: en },
      es: { translation: es }
    },
    interpolation: { escapeValue: false },
    returnNull: false
  });
}

export function t(key: string, options?: Record<string, unknown>): string {
  return String(i18next.t(key, options));
}

export function pick(text: LocalizedText): string {
  const locale = i18next.language;
  if (isLocale(locale)) {
    const value = text[locale];
    if (value) return value;
  }
  return text['pt-PT'];
}

export function formatEuro(centimos: number): string {
  return new Intl.NumberFormat(i18next.language, { style: 'currency', currency: 'EUR' }).format(centimos / 100);
}
`);

w('src/services/progress.ts', `import type { Level, WorldId } from '../content/schema';
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
`);

w('src/services/streak.ts', `import { update } from './save';

const today = (): string => new Date().toISOString().slice(0, 10);

function gap(from: string, to: string): number {
  return Math.round((Date.parse(to + 'T00:00:00Z') - Date.parse(from + 'T00:00:00Z')) / 86400000);
}

export function registerPlay(date = today()): number {
  let result = 1;
  update((draft) => {
    if (draft.lastPlayedDate === date) { result = draft.streak || 1; return; }
    draft.streak = draft.lastPlayedDate && gap(draft.lastPlayedDate, date) === 1 ? draft.streak + 1 : 1;
    draft.lastPlayedDate = date;
    result = draft.streak;
  });
  return result;
}
`);

w('src/services/achievements.ts', `import type { SaveData } from './save';

export interface Extra { totalStars: number; levelsDone: number; perfectLevels: number; bossWins: number; coins: number; }

export interface Achievement {
  id: string;
  titulo: { 'pt-PT': string; en: string };
  condicao: string;
  check: (save: SaveData, extra: Extra) => boolean;
}

const done = (s: SaveData) => Object.values(s.stars).filter((v) => v >= 1).length;
const perfect = (s: SaveData) => Object.values(s.stars).filter((v) => v === 3).length;
const stars = (s: SaveData) => Object.values(s.stars).reduce((a, b) => a + b, 0);
const worldDone = (s: SaveData, w: number) => [1,2,3,4,5,6].every((n) => (s.stars['mundo-' + w + '-nivel-' + n] ?? 0) >= 1);

const mk = (id: string, pt: string, en: string, condicao: string, check: Achievement['check']): Achievement =>
  ({ id, titulo: { 'pt-PT': pt, en }, condicao, check });

export const ACHIEVEMENTS: readonly Achievement[] = [
  mk('a01','Primeiro passo','First step','Conclui 1 nivel',(s)=>done(s)>=1),
  mk('a02','Cinco niveis','Five levels','Conclui 5 niveis',(s)=>done(s)>=5),
  mk('a03','Dez niveis','Ten levels','Conclui 10 niveis',(s)=>done(s)>=10),
  mk('a04','Vinte niveis','Twenty levels','Conclui 20 niveis',(s)=>done(s)>=20),
  mk('a05','Trinta niveis','Thirty levels','Conclui 30 niveis',(s)=>done(s)>=30),
  mk('a06','Perfeicao','Perfection','Conclui 1 nivel com 3 estrelas',(s)=>perfect(s)>=1),
  mk('a07','Cinco perfeitos','Five perfect','Conclui 5 niveis perfeitos',(s)=>perfect(s)>=5),
  mk('a08','Dez perfeitos','Ten perfect','Conclui 10 niveis perfeitos',(s)=>perfect(s)>=10),
  mk('a09','Vinte perfeitos','Twenty perfect','Conclui 20 niveis perfeitos',(s)=>perfect(s)>=20),
  mk('a10','Estrela maior','Big star','Junta 30 estrelas',(s)=>stars(s)>=30),
  mk('a11','Constelacao','Constellation','Junta 60 estrelas',(s)=>stars(s)>=60),
  mk('a12','Ceu inteiro','Whole sky','Junta 100 estrelas',(s)=>stars(s)>=100),
  mk('a13','Penas a voar','Feathers','Junta 100 penas',(s)=>s.coins>=100),
  mk('a14','Saco cheio','Full bag','Junta 300 penas',(s)=>s.coins>=300),
  mk('a15','Tesouro','Treasure','Junta 600 penas',(s)=>s.coins>=600),
  mk('a16','Boss derrubado','Boss down','Vence 1 boss',(_s,e)=>e.bossWins>=1),
  mk('a17','Cacador','Hunter','Vence 3 bosses',(_s,e)=>e.bossWins>=3),
  mk('a18','Lenda','Legend','Vence os 6 bosses',(_s,e)=>e.bossWins>=6),
  mk('a19','Tres dias','Three days','Streak de 3 dias',(s)=>s.streak>=3),
  mk('a20','Semana cheia','Full week','Streak de 7 dias',(s)=>s.streak>=7),
  mk('a21','Mes a serio','Month','Streak de 30 dias',(s)=>s.streak>=30),
  mk('a22','Curioso','Curious','Abre o perfil',()=>true),
  mk('a23','Vaidoso','Vain','Equipa um chapeu',(s)=>Boolean(s.cosmetics.equipped.hat)),
  mk('a24','Colecionador','Collector','Compra 5 cosmeticos',(s)=>s.cosmetics.owned.length>=5),
  mk('a25','Guarda-roupa','Wardrobe','Compra 15 cosmeticos',(s)=>s.cosmetics.owned.length>=15),
  mk('a26','Vale completo','Valley','Completa o Mundo 1',(s)=>worldDone(s,1)),
  mk('a27','Cozinha limpa','Kitchen','Completa o Mundo 2',(s)=>worldDone(s,2)),
  mk('a28','Oficina arrumada','Workshop','Completa o Mundo 3',(s)=>worldDone(s,3)),
  mk('a29','Mercado fechado','Market','Completa o Mundo 4',(s)=>worldDone(s,4)),
  mk('a30','Observatorio lido','Observatory','Completa o Mundo 5',(s)=>worldDone(s,5)),
  mk('a31','Enigma resolvido','Enigma','Completa o Mundo 6',(s)=>worldDone(s,6)),
  mk('a32','Coruja completa','Owl complete','Junta 150 estrelas',(s)=>stars(s)>=150)
];

export function evaluate(save: SaveData, extra: Extra): string[] {
  return ACHIEVEMENTS
    .filter((a) => !save.achievements.includes(a.id) && a.check(save, extra))
    .map((a) => a.id);
}
`);

w('src/services/shop.ts', `export type CosmeticType = 'hat' | 'colour';

export interface Cosmetic { id: string; tipo: CosmeticType; nome: { 'pt-PT': string; en: string }; preco: number; valor: string; }

export const COSMETICS: readonly Cosmetic[] = [
  { id: 'chapeu-nenhum', tipo: 'hat', nome: { 'pt-PT': 'Sem chapeu', en: 'No hat' }, preco: 0, valor: 'none' },
  { id: 'chapeu-gorro', tipo: 'hat', nome: { 'pt-PT': 'Gorro', en: 'Beanie' }, preco: 60, valor: 'beanie' },
  { id: 'chapeu-cartola', tipo: 'hat', nome: { 'pt-PT': 'Cartola', en: 'Top hat' }, preco: 80, valor: 'tophat' },
  { id: 'chapeu-coroa', tipo: 'hat', nome: { 'pt-PT': 'Coroa', en: 'Crown' }, preco: 150, valor: 'crown' },
  { id: 'chapeu-bruxa', tipo: 'hat', nome: { 'pt-PT': 'Chapeu de bruxa', en: 'Witch hat' }, preco: 180, valor: 'witch' },
  { id: 'chapeu-halo', tipo: 'hat', nome: { 'pt-PT': 'Aureola', en: 'Halo' }, preco: 220, valor: 'halo' },
  { id: 'cor-baia', tipo: 'colour', nome: { 'pt-PT': 'Baia', en: 'Bay' }, preco: 0, valor: '#8e7cf0' },
  { id: 'cor-menta', tipo: 'colour', nome: { 'pt-PT': 'Menta', en: 'Mint' }, preco: 50, valor: '#3dd6a0' },
  { id: 'cor-coral', tipo: 'colour', nome: { 'pt-PT': 'Coral', en: 'Coral' }, preco: 50, valor: '#ff7a6e' },
  { id: 'cor-ambar', tipo: 'colour', nome: { 'pt-PT': 'Ambar', en: 'Amber' }, preco: 70, valor: '#ffb44d' },
  { id: 'cor-cobalto', tipo: 'colour', nome: { 'pt-PT': 'Cobalto', en: 'Cobalt' }, preco: 70, valor: '#4d7dff' },
  { id: 'cor-rosa', tipo: 'colour', nome: { 'pt-PT': 'Rosa', en: 'Pink' }, preco: 90, valor: '#ff8ac4' },
  { id: 'cor-neve', tipo: 'colour', nome: { 'pt-PT': 'Neve', en: 'Snow' }, preco: 120, valor: '#f2f2f7' },
  { id: 'cor-noite', tipo: 'colour', nome: { 'pt-PT': 'Noite', en: 'Night' }, preco: 140, valor: '#3a2f5c' }
];

export const byId = (id: string): Cosmetic | undefined => COSMETICS.find((item) => item.id === id);
export const itemsOf = (tipo: CosmeticType): readonly Cosmetic[] => COSMETICS.filter((item) => item.tipo === tipo);
export const colourValue = (id: string | undefined): string => byId(id ?? '')?.valor ?? '#8e7cf0';
`);

w('src/services/daily.ts', `import type { Question, WorldId } from '../content/schema';
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
`);

w('src/services/audio.ts', `type Sfx = 'click' | 'correct' | 'wrong' | 'coin' | 'star' | 'jump';

let ctx: AudioContext | null = null;
let sound = true;
let music = true;

function audio(): AudioContext | null {
  if (!ctx) { try { ctx = new AudioContext(); } catch { return null; } }
  return ctx;
}

export function configure(soundOn: boolean, musicOn: boolean): void { sound = soundOn; music = musicOn; }

const TONES: Record<Sfx, readonly [number, number, OscillatorType]> = {
  click: [520, 0.05, 'sine'], correct: [660, 0.14, 'sine'], wrong: [200, 0.2, 'sawtooth'],
  coin: [880, 0.08, 'triangle'], star: [990, 0.12, 'sine'], jump: [440, 0.06, 'sine']
};

export function play(sfx: Sfx): void {
  if (!sound) return;
  const context = audio();
  if (!context) return;
  const [frequency, duration, type] = TONES[sfx];
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.1, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}
`);

w('src/services/a11y.ts', `import type { Settings } from './save';

const SCALES = ['1', '1.15', '1.3'];

export function applyA11y(settings: Settings): void {
  const root = document.documentElement;
  root.style.setProperty('--font-scale', SCALES[settings.fontScale] ?? '1');
  root.dataset.contrast = settings.highContrast ? 'high' : 'normal';
  root.dataset.dyslexia = settings.dyslexiaFont ? 'on' : 'off';
  root.lang = settings.locale;
}
`);

w('src/services/telemetry.ts', `export type TelemetryEvent =
  | { name: 'app_open' }
  | { name: 'level_start'; levelId: string }
  | { name: 'level_complete'; levelId: string; correct: number; total: number }
  | { name: 'question_answered'; questionId: string; correct: boolean };

let enabled = false;
const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST;

export function setTelemetryConsent(value: boolean): void {
  enabled = value && Boolean(key) && Boolean(host);
}

export function track(event: TelemetryEvent): void {
  if (!enabled || !key || !host) return;
  void fetch(host + '/capture/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: key, event: event.name, properties: event, distinct_id: 'anon' })
  }).catch(() => undefined);
}
`);

w('src/vite-env.d.ts', `/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
}

interface ImportMeta { readonly env: ImportMetaEnv; }
`);

console.log('Bloco 4 concluido: servicos criados.');