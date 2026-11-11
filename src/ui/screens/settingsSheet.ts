import type { Settings } from '../../services/save';
import { t } from '../../services/i18n';
import { openSheet } from '../components/dialog';

type BoolKey = 'soundEnabled' | 'musicEnabled' | 'timedMode' | 'buttonsOnly' | 'highContrast' | 'dyslexiaFont' | 'readOnlyMode';

const TOGGLES: ReadonlyArray<[BoolKey, string, boolean]> = [
  ['soundEnabled', 'settings.sound', false],
  ['musicEnabled', 'settings.music', false],
  ['timedMode', 'settings.timed', true],
  ['buttonsOnly', 'settings.buttonsOnly', false],
  ['highContrast', 'settings.highContrast', false],
  ['dyslexiaFont', 'settings.dyslexia', false],
  ['readOnlyMode', 'settings.readOnlyMode', false]
];

export function openSettings(current: Settings, onChange: (c: Partial<Settings>) => void): void {
  openSheet(t('settings.title'), (body) => {
    for (const [key, label, inverted] of TOGGLES) {
      const row = document.createElement('label');
      row.className = 'row';
      const span = document.createElement('span');
      span.textContent = t(label);
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = inverted ? !current[key] : current[key];
      input.addEventListener('change', () => {
        onChange({ [key]: inverted ? !input.checked : input.checked } as Partial<Settings>);
      });
      row.append(span, input);
      body.append(row);
    }
    const scale = document.createElement('label');
    scale.className = 'row';
    const scaleLabel = document.createElement('span');
    scaleLabel.textContent = t('settings.textSize');
    const select = document.createElement('select');
    ['settings.sizeNormal', 'settings.sizeLarge', 'settings.sizeHuge'].forEach((key, i) => {
      const option = document.createElement('option');
      option.value = String(i);
      option.textContent = t(key);
      option.selected = current.fontScale === i;
      select.append(option);
    });
    select.addEventListener('change', () => onChange({ fontScale: Number(select.value) }));
    scale.append(scaleLabel, select);
    body.append(scale);
  });
}
