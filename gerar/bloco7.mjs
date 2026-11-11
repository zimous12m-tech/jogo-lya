import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

w('src/ui/screens/worldMap.ts', `import type { Level, World, WorldId } from '../../content/schema';
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
`);

w('src/ui/screens/levelSelect.ts', `import type { Level, World } from '../../content/schema';
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
`);

w('src/ui/screens/game.ts', `import type { Question } from '../../content/schema';
import type { GameHandle } from '../../game/game';
import { pick, t } from '../../services/i18n';
import { play } from '../../services/audio';
import { icon } from '../components/icons';
import { renderVisual } from '../components/visual';
import { qs } from '../dom';

export interface GameResult { correct: number; total: number; errors: number; }

export interface GameDeps {
  questions: readonly Question[];
  training: boolean;
  boss: boolean;
  timed: boolean;
  buttonsOnly: boolean;
  readOnly: boolean;
  mountGame: (arena: HTMLElement) => GameHandle;
  onExit: () => void;
  onFinish: (r: GameResult) => void;
}

const SECONDS = 20;

export function renderGame(root: HTMLElement, deps: GameDeps): void {
  const total = deps.questions.length;
  let index = 0; let correct = 0; let errors = 0; let lives = 3; let answered = false;
  let timer: number | null = null; let remaining = SECONDS;

  root.innerHTML = '<main class="screen"><div class="hud">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-exit aria-label="' + t('game.exit') + '">' + icon('exit', 20) + '</button>'
    + '<span class="hud__progress" data-progress role="status" aria-live="polite"></span>'
    + (deps.boss ? '<span class="chip" data-lives></span>' : '')
    + (deps.boss && deps.timed ? '<span class="hud__timer" data-timer></span>' : '')
    + '</div><div class="card"><p class="question" data-question></p></div>'
    + '<div class="visual" data-visual></div><div class="arena" data-arena aria-label="' + t('game.arena') + '"></div>'
    + '<div class="controls" data-controls>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-left aria-label="' + t('game.left') + '">' + icon('left') + '</button>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-jump aria-label="' + t('game.jump') + '">' + icon('up') + '</button>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-right aria-label="' + t('game.right') + '">' + icon('right') + '</button></div>'
    + '<div class="options" data-options role="group" aria-label="' + t('game.options') + '"></div>'
    + '<div class="feedback" data-feedback hidden aria-live="assertive"><p class="feedback__title" data-title></p>'
    + '<span class="feedback__label">' + t('game.explanation') + '</span><p data-explanation></p>'
    + '<button class="btn btn--primary" type="button" data-next>' + icon('next', 20) + '<span data-next-label></span></button></div></main>';

  const progressEl = qs<HTMLSpanElement>(root, '[data-progress]');
  const questionEl = qs<HTMLParagraphElement>(root, '[data-question]');
  const visualEl = qs<HTMLDivElement>(root, '[data-visual]');
  const optionsEl = qs<HTMLDivElement>(root, '[data-options]');
  const feedbackEl = qs<HTMLDivElement>(root, '[data-feedback]');
  const titleEl = qs<HTMLParagraphElement>(root, '[data-title]');
  const explanationEl = qs<HTMLParagraphElement>(root, '[data-explanation]');
  const nextBtn = qs<HTMLButtonElement>(root, '[data-next]');
  const nextLabel = qs<HTMLSpanElement>(root, '[data-next-label]');
  const arenaEl = qs<HTMLDivElement>(root, '[data-arena]');
  const controlsEl = qs<HTMLDivElement>(root, '[data-controls]');
  const livesEl = root.querySelector<HTMLSpanElement>('[data-lives]');
  const timerEl = root.querySelector<HTMLSpanElement>('[data-timer]');

  if (deps.buttonsOnly) { arenaEl.hidden = true; controlsEl.hidden = true; }
  const game = deps.buttonsOnly ? null : deps.mountGame(arenaEl);

  const paintLives = (): void => { if (livesEl) livesEl.textContent = '#'.repeat(lives); };
  const stop = (): void => { if (timer !== null) window.clearInterval(timer); timer = null; };

  const finishQuestion = (question: Question, choice: number): void => {
    answered = true;
    stop();
    const right = choice === question.resposta;
    if (right) correct += 1; else { errors += 1; if (deps.boss) { lives -= 1; paintLives(); } }
    optionsEl.querySelectorAll<HTMLButtonElement>('.option').forEach((b, i) => {
      b.disabled = true;
      if (i === question.resposta) b.classList.add('is-correct');
      else if (i === choice) b.classList.add('is-wrong');
    });
    if (right) game?.celebrate();
    play(right ? 'correct' : 'wrong');
    feedbackEl.hidden = false;
    feedbackEl.className = 'feedback ' + (right ? 'is-correct' : 'is-wrong');
    titleEl.textContent = right ? t('game.correct') : t('game.wrong');
    explanationEl.textContent = pick(question.explicacao);
    nextLabel.textContent = index === total - 1 || (deps.boss && lives <= 0) ? t('game.finish') : t('game.next');
    nextBtn.focus();
  };

  const handlePick = (choice: number): void => {
    if (answered) return;
    finishQuestion(deps.questions[index], choice);
  };

  const startTimer = (): void => {
    stop();
    if (!deps.boss || !deps.timed || !timerEl) return;
    remaining = SECONDS;
    timerEl.textContent = remaining + 's';
    timer = window.setInterval(() => {
      remaining -= 1;
      timerEl.textContent = remaining + 's';
      if (remaining <= 0) handlePick(-1);
    }, 1000);
  };

  const show = (): void => {
    const question = deps.questions[index];
    answered = false;
    progressEl.textContent = t('game.progress', { current: index + 1, total });
    questionEl.textContent = pick(question.pergunta);
    visualEl.innerHTML = renderVisual(question.visual);
    optionsEl.innerHTML = '';
    feedbackEl.hidden = true;
    question.opcoes.forEach((label, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'option'; b.textContent = label;
      b.addEventListener('click', () => handlePick(i));
      optionsEl.appendChild(b);
    });
    if (deps.readOnly) { finishQuestion(question, question.resposta); return; }
    game?.startLevel(question.opcoes, handlePick, deps.boss);
    startTimer();
  };

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    if (index === total - 1 || (deps.boss && lives <= 0)) { deps.onFinish({ correct, total, errors }); return; }
    index += 1;
    show();
  });

  qs<HTMLButtonElement>(root, '[data-exit]').addEventListener('click', () => { stop(); deps.onExit(); });

  if (game) {
    const hold = (sel: string, down: () => void, up: () => void): void => {
      const b = qs<HTMLButtonElement>(root, sel);
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); down(); });
      for (const type of ['pointerup', 'pointercancel', 'pointerleave']) b.addEventListener(type, up);
    };
    hold('[data-left]', () => game.setInput(-1), () => game.setInput(0));
    hold('[data-right]', () => game.setInput(1), () => game.setInput(0));
    qs<HTMLButtonElement>(root, '[data-jump]').addEventListener('pointerdown', (e) => { e.preventDefault(); game.jump(); });
  }

  paintLives();
  show();
}
`);

w('src/ui/screens/complete.ts', `import { t } from '../../services/i18n';
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
`);

w('src/ui/screens/shop.ts', `import { pick, t } from '../../services/i18n';
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
`);

w('src/ui/screens/parentZone.ts', `import { t } from '../../services/i18n';
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
`);

w('src/ui/screens/credits.ts', `import { t } from '../../services/i18n';
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
`);

w('src/ui/screens/profile.ts', `import { ACHIEVEMENTS } from '../../services/achievements';
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
`);

w('src/ui/screens/settingsSheet.ts', `import type { Settings } from '../../services/save';
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
`);

w('src/ui/app.ts', `import type { Level, Question, World, WorldId } from '../content/schema';
import { loadLevelQuestions, loadLevels, loadWorldManifest, loadWorlds } from '../content/worlds';
import { createGame } from '../game/game';
import { applyA11y } from '../services/a11y';
import { evaluate } from '../services/achievements';
import { configure, play } from '../services/audio';
import { buildDaily, isDailyAvailable, markDailyDone } from '../services/daily';
import { computeStars, featherReward, isLevelUnlocked } from '../services/progress';
import { addCoins, load, recordLevelResult, saveSettings, update } from '../services/save';
import { registerPlay } from '../services/streak';
import { setTelemetryConsent, track } from '../services/telemetry';
import { renderComplete } from './screens/complete';
import { renderCredits } from './screens/credits';
import { renderGame } from './screens/game';
import { renderLevelSelect } from './screens/levelSelect';
import { renderParentZone } from './screens/parentZone';
import { renderShop } from './screens/shop';
import { renderWorldMap } from './screens/worldMap';
import { openProfile } from './screens/profile';
import { openSettings } from './screens/settingsSheet';

export function startApp(root: HTMLElement): void {
  let game: ReturnType<typeof createGame> | null = null;

  const dispose = (): void => { game?.destroy(); game = null; };

  const sync = (): void => {
    const s = load().settings;
    applyA11y(s);
    configure(s.soundEnabled, s.musicEnabled);
    setTelemetryConsent(s.analyticsConsent);
  };

  const checkAchievements = (): void => {
    const snap = load();
    const novos = evaluate(snap, {
      totalStars: Object.values(snap.stars).reduce((a, b) => a + b, 0),
      levelsDone: Object.values(snap.stars).filter((v) => v >= 1).length,
      perfectLevels: Object.values(snap.stars).filter((v) => v === 3).length,
      bossWins: snap.bossesWon.length,
      coins: snap.coins
    });
    if (novos.length) {
      update((d) => { d.achievements.push(...novos); });
      play('star');
    }
  };

  const toMap = (): void => {
    dispose();
    void loadWorlds().then(async (worlds) => {
      const byWorld: Record<string, readonly Level[]> = {};
      const all = await Promise.all(worlds.map((w) => loadLevels(w.id)));
      worlds.forEach((w, i) => { byWorld[w.id] = all[i] ?? []; });
      sync();
      renderWorldMap(root, {
        worlds, byWorld, save: load(), dailyAvailable: isDailyAvailable(),
        onWorld: (id) => void toLevels(id),
        onProfile: () => openProfile(load()),
        onShop: () => renderShop(root, toMap),
        onDaily: () => void toDaily(),
        onParents: () => renderParentZone(root, toMap),
        onCredits: () => renderCredits(root, toMap),
        onSettings: () => openSettings(load().settings, (c) => { saveSettings(c); sync(); toMap(); })
      });
    });
  };

  const toLevels = async (worldId: WorldId): Promise<void> => {
    dispose();
    const [world, levels] = await Promise.all([loadWorldManifest(worldId), loadLevels(worldId)]);
    renderLevelSelect(root, {
      world, levels, save: load(), onBack: toMap,
      onPlay: (levelId, training) => void toGame(world, levels, levelId, training)
    });
  };

  const run = async (
    questions: readonly Question[], training: boolean, boss: boolean,
    onExit: () => void, onDone: (correct: number, errors: number) => void
  ): Promise<void> => {
    const s = load().settings;
    dispose();
    renderGame(root, {
      questions, training, boss, timed: s.timedMode,
      buttonsOnly: s.buttonsOnly || s.readOnlyMode, readOnly: s.readOnlyMode,
      mountGame: (arena) => { const h = createGame(arena); game = h; return h; },
      onExit,
      onFinish: (r) => onDone(r.correct, r.errors)
    });
  };

  const toGame = async (world: World, levels: readonly Level[], levelId: string, training: boolean): Promise<void> => {
    if (!isLevelUnlocked(load(), levels, levelId)) return;
    const level = levels.find((l) => l.id === levelId);
    if (!level) return;
    registerPlay();
    track({ name: 'level_start', levelId });
    const questions = await loadLevelQuestions(world.id, levelId);
    const pos = levels.findIndex((l) => l.id === levelId);
    const next = levels[pos + 1];

    await run(questions, training, level.boss, () => void toLevels(world.id), (correct, errors) => {
      const stars = computeStars(errors);
      let feathers = 0;
      if (!training) {
        recordLevelResult(levelId, stars);
        if (level.boss && errors < 3) {
          update((d) => { if (!d.bossesWon.includes(levelId)) d.bossesWon.push(levelId); });
        }
        feathers = featherReward(correct, stars);
        addCoins(feathers);
        checkAchievements();
        track({ name: 'level_complete', levelId, correct, total: questions.length });
      }
      dispose();
      renderComplete(root, {
        stars, feathers, correct, total: questions.length, training, hasNext: Boolean(next),
        onRepeat: () => void toGame(world, levels, levelId, training),
        onNext: () => { if (next) void toGame(world, levels, next.id, false); },
        onMap: () => void toLevels(world.id)
      });
    });
  };

  const toDaily = async (): Promise<void> => {
    if (!isDailyAvailable()) return;
    const ids = await loadWorlds().then((w) => w.map((x) => x.id));
    const questions = await buildDaily(ids);
    if (!questions.length) return;
    await run(questions, false, false, toMap, (correct) => {
      markDailyDone();
      const feathers = correct;
      addCoins(feathers);
      checkAchievements();
      dispose();
      renderComplete(root, {
        stars: computeStars(questions.length - correct), feathers, correct, total: questions.length,
        training: false, hasNext: false,
        onRepeat: () => void toDaily(), onNext: toMap, onMap: toMap
      });
    });
  };

  sync();
  track({ name: 'app_open' });
  toMap();
}
`);

console.log('Bloco 7 concluido: todos os ecras e o router criados.');