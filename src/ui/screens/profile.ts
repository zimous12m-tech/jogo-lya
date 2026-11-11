import { ACHIEVEMENTS } from '../../services/achievements';
import { pick, t } from '../../services/i18n';
import type { SaveData } from '../../services/save';
import { icon } from '../components/icons';
import { owlSvg } from '../components/owl';
import { colourValue } from '../../services/shop';
import { openSheet } from '../components/dialog';

export function openProfile(save: SaveData): void {
  openSheet(t('profile.title'), (body) => {
    const stars = Object.values(save.stars).reduce((a, b) => a + b, 0);
    const stats = document.createElement('ul');
    stats.className = 'stat-list';
    stats.innerHTML = '<li>' + icon('feather', 18) + t('profile.coins', { count: save.coins }) + '</li>'
      + '<li>' + icon('flame', 18) + t('profile.streak', { count: save.streak }) + '</li>'
      + '<li>' + icon('star', 18) + t('profile.stars', { count: stars }) + '</li>';
    const grid = document.createElement('ul');
    grid.className = 'achievement-grid';
    for (const a of ACHIEVEMENTS) {
      const unlocked = save.achievements.includes(a.id);
      const li = document.createElement('li');
      li.className = 'achievement' + (unlocked ? ' is-unlocked' : '');
      li.title = a.condicao;
      li.innerHTML = icon('star', 16) + '<span>' + pick(a.titulo) + '</span>';
      grid.append(li);
    }
    const avatar = document.createElement('div');
    avatar.className = 'profile-owl';
    avatar.innerHTML = owlSvg(90, save.cosmetics.equipped.hat, colourValue(save.cosmetics.equipped.colour));
    body.append(avatar, stats, grid);
  });
}
