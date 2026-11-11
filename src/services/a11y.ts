import type { Settings } from './save';

const SCALES = ['1', '1.15', '1.3'];

export function applyA11y(settings: Settings): void {
  const root = document.documentElement;
  root.style.setProperty('--font-scale', SCALES[settings.fontScale] ?? '1');
  root.dataset.contrast = settings.highContrast ? 'high' : 'normal';
  root.dataset.dyslexia = settings.dyslexiaFont ? 'on' : 'off';
  root.lang = settings.locale;
}
