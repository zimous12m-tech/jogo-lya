import { pick, t } from '../../services/i18n';
import { play } from '../../services/audio';
import { addCoins, load, update } from '../../services/save';
import { COSMETICS, colourValue, itemsOf, type CosmeticType } from '../../services/shop';
import { icon } from '../components/icons';
import { owlSvg } from '../components/owl';
import { qs } from '../dom';

const TABS: CosmeticType[] = ['hat', 'colour'];

export function renderShop(root: HTMLElement, onBack: () => void): void {
  let tab: CosmeticType = 'hat';
  const draw = (): void => {
    const save = load();
    const items = itemsOf(tab).map((item) => {
      const owned = save.cosmetics.owned.includes(item.id);
      const equipped = save.cosmetics.equipped[item.tipo] === item.id;
      return '<li class="shop-item"><span class="shop-item__preview" style="background:' + (item.tipo === 'colour' ? item.valor : 'var(--color-surface-raised)') + '"></span>'
        + '<span>' + pick(item.nome) + '</span><span>' + (owned ? (equipped ? t('shop.equipped') : t('shop.own')) : icon('feather', 14) + item.preco) + '</span>'
        + '<button class="btn ' + (owned ? 'btn--ghost' : 'btn--primary') + '" type="button" data-buy="' + item.id + '" ' + (owned && equipped ? 'disabled' : '') + '>'
        + (owned ? t('shop.equip') : t('shop.buy')) + '</button></li>';
    }).join('');

    root.innerHTML = '<main class="screen"><header class="topbar">'
      + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button>'
      + '<span class="chip">' + icon('feather', 16) + save.coins + '</span></header>'
      + '<h1>' + t('shop.title') + '</h1><div class="profile-owl">' + owlSvg(96, save.cosmetics.equipped.hat, colourValue(save.cosmetics.equipped.colour)) + '</div>'
      + '<div class="tabs">' + TABS.map((n) => '<button class="tab ' + (n === tab ? 'is-active' : '') + '" type="button" data-tab="' + n + '">' + t('shop.tab.' + n) + '</button>').join('') + '</div>'
      + '<ul class="shop-list">' + items + '</ul></main>';

    qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', onBack);
    root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((b) => {
      b.addEventListener('click', () => { tab = (b.dataset.tab as CosmeticType) ?? 'hat'; draw(); });
    });
    root.querySelectorAll<HTMLButtonElement>('[data-buy]').forEach((b) => {
      b.addEventListener('click', () => {
        const item = COSMETICS.find((c) => c.id === b.dataset.buy);
        if (!item) return;
        const current = load();
        if (!current.cosmetics.owned.includes(item.id)) {
          if (current.coins < item.preco) return;
          addCoins(-item.preco);
          update((d) => { d.cosmetics.owned.push(item.id); });
        }
        update((d) => { d.cosmetics.equipped[item.tipo] = item.id; });
        play('coin');
        draw();
      });
    });
  };
  draw();
}
