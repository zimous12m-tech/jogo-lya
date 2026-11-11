import type { Level, World } from '../../content/schema';
import { pick, t } from '../../services/i18n';
import { isLevelUnlocked } from '../../services/progress';
import type { SaveData } from '../../services/save';
import { icon } from '../components/icons';
import { worldIcon } from '../components/worldIcons';
import { qs } from '../dom';

export interface LevelSelectDeps {
  world: World;
  levels: readonly Level[];
  save: SaveData;
  onBack: () => void;
  onPlay: (levelId: string, training: boolean) => void;
}

export function renderLevelSelect(root: HTMLElement, deps: LevelSelectDeps): void {
  const cards = deps.levels.map((level) => {
    const unlocked = isLevelUnlocked(deps.save, deps.levels, level.id);
    const stars = deps.save.stars[level.id] ?? 0;
    const mark = [0, 1, 2].map((i) => '<span class="' + (i < stars ? '' : 'is-off') + '">' + icon('star', 18) + '</span>').join('');
    return '<li class="level ' + (unlocked ? '' : 'is-locked') + '">'
      + '<span class="level__stars" role="img" aria-label="' + t('level.stars', { count: stars }) + '">' + mark + '</span>'
      + '<span>' + pick(level.titulo) + '</span><div class="level__actions">'
      + '<button class="btn btn--primary" type="button" data-play="' + level.id + '" ' + (unlocked ? '' : 'disabled') + '>' + icon('play', 18) + t('level.play') + '</button>'
      + '<button class="btn btn--ghost" type="button" data-train="' + level.id + '" ' + (unlocked ? '' : 'disabled') + '>' + t('level.train') + '</button>'
      + '</div></li>';
  }).join('');

  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button>'
    + '<h1>' + worldIcon(deps.world.icone, 24) + ' ' + pick(deps.world.nome) + '</h1></header>'
    + '<ul class="level-list">' + cards + '</ul></main>';

  qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', deps.onBack);
  root.querySelectorAll<HTMLButtonElement>('[data-play]').forEach((b) => {
    b.addEventListener('click', () => { const id = b.dataset.play; if (id) deps.onPlay(id, false); });
  });
  root.querySelectorAll<HTMLButtonElement>('[data-train]').forEach((b) => {
    b.addEventListener('click', () => { const id = b.dataset.train; if (id) deps.onPlay(id, true); });
  });
}
