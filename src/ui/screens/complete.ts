import { t } from '../../services/i18n';
import { icon } from '../components/icons';
import { owlSvg } from '../components/owl';
import { qs } from '../dom';

export interface CompleteDeps {
  stars: number; feathers: number; correct: number; total: number; training: boolean; hasNext: boolean;
  onRepeat: () => void; onNext: () => void; onMap: () => void;
}

export function renderComplete(root: HTMLElement, deps: CompleteDeps): void {
  const marks = [0, 1, 2].map((i) => '<span class="' + (i < deps.stars ? '' : 'is-off') + '">' + icon('star', 36) + '</span>').join('');
  root.innerHTML = '<main class="screen complete">' + owlSvg(110)
    + '<h1>' + t('complete.title') + '</h1>'
    + '<div class="complete__stars" role="img" aria-label="' + t('level.stars', { count: deps.stars }) + '">' + marks + '</div>'
    + '<p>' + t('complete.score', { correct: deps.correct, total: deps.total }) + '</p>'
    + (deps.training ? '<p class="chip">' + t('complete.trainingNote') + '</p>'
      : '<p class="chip">' + icon('feather', 16) + t('complete.coins', { count: deps.feathers }) + '</p>')
    + '<div class="complete__actions">'
    + '<button class="btn btn--ghost" type="button" data-repeat>' + icon('repeat', 18) + t('complete.repeat') + '</button>'
    + (deps.hasNext && !deps.training ? '<button class="btn btn--primary" type="button" data-next>' + icon('next', 18) + t('complete.next') + '</button>' : '')
    + '<button class="btn btn--ghost" type="button" data-map>' + t('complete.map') + '</button></div></main>';

  const repeat = qs<HTMLButtonElement>(root, '[data-repeat]');
  repeat.addEventListener('click', deps.onRepeat);
  qs<HTMLButtonElement>(root, '[data-map]').addEventListener('click', deps.onMap);
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  next?.addEventListener('click', deps.onNext);
  (next ?? repeat).focus();
}
