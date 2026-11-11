import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const flat = (o: Record<string, unknown>, p = ''): string[] =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v as Record<string, unknown>, p + k + '.') : [p + k]));

const base = new Set(flat(JSON.parse(readFileSync('src/locales/pt-PT.json', 'utf8')) as Record<string, unknown>));

describe('locales', () => {
  it.each(['pt-BR', 'en', 'es'])('%s tem as mesmas chaves', (locale) => {
    const keys = new Set(flat(JSON.parse(readFileSync('src/locales/' + locale + '.json', 'utf8')) as Record<string, unknown>));
    expect([...base].filter((k) => !keys.has(k))).toEqual([]);
  });
});
