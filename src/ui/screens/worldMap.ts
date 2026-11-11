import type { Level, World, WorldId } from '../../content/schema';
import { pick, t } from '../../services/i18n';
import { isWorldComplete, isWorldUnlocked, worldStars } from '../../services/progress';
import type { SaveData } from '../../services/save';
import { icon } from '../components/icons';
import { worldIcon } from '../components/worldIcons';
import { qs } from '../dom';

export interface WorldMapDeps {
  worlds: readonly World[];
  byWorld: Readonly<Record<string, readonly Level[]>>;
  save: SaveData;
  dailyAvailable: boolean;
  onWorld: (id: WorldId) => void;
  onProfile: () => void;
  onSettings: () => void;
  onShop: () => void;
  onDaily: () => void;
  onParents: () => void;
  onCredits: () => void;
}

export function renderWorldMap(root: HTMLElement, deps: WorldMapDeps): void {
  const order = deps.worlds.map((w) => w.id);
  const cards = deps.worlds.map((world) => {
    const levels = deps.byWorld[world.id] ?? [];
    const unlocked = isWorldUnlocked(deps.save, world.id, order, deps.byWorld);
    const complete = isWorldComplete(deps.save, levels);
    return '<li><button class="world ' + (unlocked ? '' : 'is-locked') + '" type="button" data-world="' + world.id + '" '
      + (unlocked ? '' : 'disabled') + ' style="--world:' + world.cor + ';--world-soft:' + world.corSuave + '">'
      + '<span class="world__icon">' + worldIcon(world.icone) + '</span><span class="world__body">'
      + '<span class="world__name">' + pick(world.nome) + '</span>'
      + '<span class="world__desc">' + pick(world.descricao) + '</span>'
      + '<span class="world__meta">' + t('world.progress', { done: worldStars(deps.save, levels), total: levels.length * 3 }) + '</span></span>'
      + '<span class="world__state">' + (complete ? icon('star', 20) : unlocked ? icon('next', 20) : icon('lock', 20)) + '</span></button></li>';
  }).join('');

  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-settings aria-label="' + t('settings.open') + '">' + icon('cog', 20) + '</button>'
    + '<button class="btn btn--ghost" type="button" data-profile>' + icon('feather', 18) + deps.save.coins
    + '<span class="streak">' + icon('flame', 18) + deps.save.streak + '</span></button></header>'
    + '<h1>' + t('world.title') + '</h1><ul class="world-list">' + cards + '</ul>'
    + '<nav class="bottom-nav"><button class="btn btn--ghost" type="button" data-daily>' + icon('flame', 18) + t('daily.open') + '</button>'
    + '<button class="btn btn--ghost" type="button" data-shop>' + icon('feather', 18) + t('shop.open') + '</button></nav>'
    + '<footer class="map-footer"><button class="btn btn--ghost" type="button" data-parents>' + t('parents.title') + '</button>'
    + '<button class="btn btn--ghost" type="button" data-credits>' + t('credits.title') + '</button></footer></main>';

  qs<HTMLButtonElement>(root, '[data-settings]').addEventListener('click', deps.onSettings);
  qs<HTMLButtonElement>(root, '[data-profile]').addEventListener('click', deps.onProfile);
  qs<HTMLButtonElement>(root, '[data-shop]').addEventListener('click', deps.onShop);
  qs<HTMLButtonElement>(root, '[data-daily]').addEventListener('click', deps.onDaily);
  qs<HTMLButtonElement>(root, '[data-parents]').addEventListener('click', deps.onParents);
  qs<HTMLButtonElement>(root, '[data-credits]').addEventListener('click', deps.onCredits);
  root.querySelectorAll<HTMLButtonElement>('[data-world]').forEach((b) => {
    b.addEventListener('click', () => { const id = b.dataset.world; if (id) deps.onWorld(id as WorldId); });
  });
}
