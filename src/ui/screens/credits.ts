import { t } from '../../services/i18n';
import { icon } from '../components/icons';
import { qs } from '../dom';

export function renderCredits(root: HTMLElement, onBack: () => void): void {
  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button></header>'
    + '<h1>' + t('credits.title') + '</h1><div class="card">'
    + '<h2>' + t('credits.team') + '</h2><p>' + t('credits.teamText') + '</p>'
    + '<h2>' + t('credits.tech') + '</h2><p>' + t('credits.techText') + '</p>'
    + '<h2>' + t('credits.privacy') + '</h2><p>' + t('credits.privacyText') + '</p></div></main>';
  qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', onBack);
}
