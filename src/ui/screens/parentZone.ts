import { t } from '../../services/i18n';
import { load, saveSettings } from '../../services/save';
import { icon } from '../components/icons';
import { qs } from '../dom';

export function renderParentZone(root: HTMLElement, onBack: () => void): void {
  const save = load();
  const a = 17; const b = 4;
  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button></header>'
    + '<h1>' + t('parents.title') + '</h1><div class="card"><p>' + t('parents.gate', { a, b }) + '</p>'
    + '<input class="gate-input" type="number" data-gate /><p data-error hidden>' + t('parents.gateError') + '</p>'
    + '<button class="btn btn--primary" type="button" data-enter>' + t('parents.enter') + '</button></div><div data-report hidden></div></main>';

  const report = qs<HTMLDivElement>(root, '[data-report]');
  const input = qs<HTMLInputElement>(root, '[data-gate]');
  const error = qs<HTMLParagraphElement>(root, '[data-error]');
  qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', onBack);

  qs<HTMLButtonElement>(root, '[data-enter]').addEventListener('click', () => {
    if (Number(input.value) !== a * b) { error.hidden = false; return; }
    const rows = Object.entries(save.stars).map(([id, s]) => '<tr><td>' + id + '</td><td>' + s + '</td></tr>').join('');
    report.hidden = false;
    report.innerHTML = '<h2>' + t('parents.report') + '</h2><table class="report-table"><thead><tr><th>' + t('parents.level') + '</th><th>' + t('parents.stars') + '</th></tr></thead>'
      + '<tbody>' + (rows || '<tr><td colspan="2">' + t('parents.empty') + '</td></tr>') + '</tbody></table>'
      + '<label class="row"><span>' + t('parents.analytics') + '</span><input type="checkbox" data-analytics ' + (save.settings.analyticsConsent ? 'checked' : '') + ' /></label>';
    report.querySelector<HTMLInputElement>('[data-analytics]')?.addEventListener('change', (e) => {
      saveSettings({ analyticsConsent: (e.target as HTMLInputElement).checked });
    });
  });
}
