import i18next from 'i18next';
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
