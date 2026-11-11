import { z } from 'zod';
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
