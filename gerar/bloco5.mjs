import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

w('src/main.ts', `import './styles/tokens.css';
import './styles/base.css';
import './styles/ui.css';
import { registerSW } from 'virtual:pwa-register';
import { applyA11y } from './services/a11y';
import { initI18n, DEFAULT_LOCALE, isLocale } from './services/i18n';
import { load } from './services/save';
import { startApp } from './ui/app';

registerSW({ immediate: true });

const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('Sem #app');

const save = load();
applyA11y(save.settings);
const browser = navigator.language;
const locale = isLocale(browser) ? browser : save.settings.locale;

void initI18n(locale).then(() => {
  document.documentElement.lang = locale;
  startApp(root);
});
`);

w('src/ui/dom.ts', `export function qs<T extends Element>(parent: ParentNode, selector: string): T {
  const el = parent.querySelector<T>(selector);
  if (!el) throw new Error('Elemento em falta: ' + selector);
  return el;
}
`);

w('src/ui/components/icons.ts', `const PATHS = {
  play: '<path d="M7 4l13 8-13 8z" />',
  next: '<path d="M5 12h14" /><path d="M13 6l6 6-6 6" />',
  exit: '<path d="M6 6l12 12" /><path d="M18 6L6 18" />',
  star: '<path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9 9.1 9z" />',
  feather: '<path d="M12 3c-3.2 3.2-5 6.3-5 9.4A5 5 0 0 0 12 17a5 5 0 0 0 5-4.6c0-3.1-1.8-6.2-5-9.4z" /><path d="M12 17v4" />',
  left: '<path d="M15 6l-6 6 6 6" />',
  right: '<path d="M9 6l6 6-6 6" />',
  up: '<path d="M6 15l6-6 6 6" />',
  lock: '<rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />',
  cog: '<circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" />',
  flame: '<path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9z" />',
  repeat: '<path d="M4 10V8a3 3 0 0 1 3-3h10" /><path d="M14 2l3 3-3 3" /><path d="M20 14v2a3 3 0 0 1-3 3H7" />'
} as const;

export type IconName = keyof typeof PATHS;

export function icon(name: IconName, size = 24): string {
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + PATHS[name] + '</svg>';
}
`);

w('src/ui/components/worldIcons.ts', `const PATHS: Record<string, string> = {
  numeros: '<path d="M6 4v16" /><path d="M18 4v16" /><path d="M3 9h18" /><path d="M3 15h18" />',
  fracoes: '<circle cx="9" cy="9" r="5" /><path d="M14 14l6 6" />',
  geometria: '<path d="M12 3l9 17H3z" /><path d="M12 10v6" />',
  percentagens: '<circle cx="7" cy="7" r="3" /><circle cx="17" cy="17" r="3" /><path d="M19 5L5 19" />',
  estatistica: '<path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" />',
  logica: '<circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" />'
};

export function worldIcon(name: string, size = 32): string {
  const path = PATHS[name] ?? PATHS.logica;
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' + path + '</svg>';
}
`);

w('src/ui/components/owl.ts', `const HATS: Record<string, string> = {
  beanie: '<path d="M32 22a28 28 0 0 1 56 0z" fill="#ff7a6e" stroke="#241c2e" stroke-width="3" />',
  tophat: '<rect x="36" y="6" width="48" height="26" fill="#241c2e" /><rect x="26" y="30" width="68" height="8" fill="#241c2e" />',
  crown: '<path d="M32 34l8-20 10 12 10-12 8 20z" fill="#fdcb6e" stroke="#241c2e" stroke-width="3" />',
  witch: '<path d="M60 2l26 36H34z" fill="#3a2f5c" /><rect x="28" y="34" width="64" height="8" fill="#3a2f5c" />',
  halo: '<ellipse cx="60" cy="14" rx="24" ry="7" fill="none" stroke="#fdcb6e" stroke-width="5" />'
};

export function owlSvg(size = 132, hat?: string, colour = '#8e7cf0'): string {
  return '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">'
    + '<ellipse cx="60" cy="70" rx="34" ry="38" fill="' + colour + '" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="48" cy="50" r="14" fill="#fff" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="72" cy="50" r="14" fill="#fff" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="48" cy="51" r="6" fill="#241c2e" /><circle cx="72" cy="51" r="6" fill="#241c2e" />'
    + '<path d="M60 62 L52 74 L68 74 Z" fill="#fdcb6e" stroke="#241c2e" stroke-width="3" />'
    + (HATS[hat ?? ''] ?? '') + '</svg>';
}
`);

w('src/ui/components/visual.ts', `import type { Visual } from '../../content/schema';
import { formatEuro } from '../../services/i18n';

function pizza(fatias: number, comidas: number): string {
  const r = 58; const c = 70; const step = (Math.PI * 2) / fatias;
  let out = '';
  for (let i = 0; i < fatias; i += 1) {
    const a0 = -Math.PI / 2 + i * step; const a1 = a0 + step;
    const x0 = c + r * Math.cos(a0); const y0 = c + r * Math.sin(a0);
    const x1 = c + r * Math.cos(a1); const y1 = c + r * Math.sin(a1);
    const large = step > Math.PI ? 1 : 0;
    out += '<path d="M' + c + ' ' + c + ' L' + x0.toFixed(2) + ' ' + y0.toFixed(2) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' Z" fill="' + (i < comidas ? '#fdcb6e' : '#fff') + '" stroke="#241c2e" stroke-width="2.5" />';
  }
  return '<svg viewBox="0 0 140 140" width="140" height="140" role="img">' + out + '</svg>';
}

function bar(n: number, d: number, color: string): string {
  const h = 120; const seg = h / d; let out = '';
  for (let i = 0; i < d; i += 1) {
    out += '<rect x="0" y="' + (i * seg).toFixed(2) + '" width="38" height="' + seg.toFixed(2) + '" fill="' + (i < n ? color : '#fff') + '" stroke="#241c2e" stroke-width="2" />';
  }
  return '<svg viewBox="0 0 38 120" width="38" height="120" role="img">' + out + '</svg>';
}

export function renderVisual(visual: Visual | undefined): string {
  if (!visual) return '';
  if (visual.tipo === 'pizza') return '<div class="visual__label">' + pizza(visual.fatias, visual.comidas) + '</div>';
  if (visual.tipo === 'fracaoComparada') {
    return '<div class="visual__label">' + bar(visual.a.n, visual.a.d, '#6c5ce7') + visual.a.n + '/' + visual.a.d + '</div>'
      + '<div class="visual__label">' + bar(visual.b.n, visual.b.d, '#fdcb6e') + visual.b.n + '/' + visual.b.d + '</div>';
  }
  return '<div class="visual__label">' + formatEuro(visual.precoCentimos) + '<br>- ' + visual.percentagem + ' %</div>';
}
`);

w('src/ui/components/dialog.ts', `export function openSheet(title: string, build: (body: HTMLElement) => void): void {
  const dialog = document.createElement('dialog');
  dialog.className = 'sheet';
  const header = document.createElement('div');
  header.className = 'sheet__header';
  const h = document.createElement('h2');
  h.textContent = title;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn btn--ghost btn--icon';
  close.textContent = 'x';
  close.setAttribute('aria-label', 'Fechar');
  header.append(h, close);
  const body = document.createElement('div');
  body.className = 'sheet__body';
  dialog.append(header, body);
  document.body.append(dialog);
  const finish = (): void => { dialog.close(); dialog.remove(); };
  close.addEventListener('click', finish);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); finish(); });
  build(body);
  dialog.showModal();
  h.tabIndex = -1;
  h.focus();
}
`);

w('src/game/game.ts', `import Phaser from 'phaser';
import { PlayScene, type PlayLevelData } from './scenes/PlayScene';

export interface GameHandle {
  startLevel(options: readonly string[], onPick: (index: number) => void, boss: boolean): void;
  setInput(dir: -1 | 0 | 1): void;
  jump(): void;
  celebrate(): void;
  destroy(): void;
}

export function createGame(parent: HTMLElement): GameHandle {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#dff6ff',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 720, height: 300 },
    physics: { default: 'matter', matter: { gravity: { x: 0, y: 1.1 }, debug: false } },
    scene: [PlayScene]
  });

  let scene: PlayScene | null = null;
  let pending: PlayLevelData | null = null;

  game.events.once(Phaser.Core.Events.READY, () => {
    scene = game.scene.getScene('Play') as PlayScene;
    if (pending) { scene.setLevel(pending); pending = null; }
  });

  return {
    startLevel(options, onPick, boss) {
      const data: PlayLevelData = { options, onPick, boss };
      if (scene) scene.setLevel(data); else pending = data;
    },
    setInput(dir) { scene?.setInput(dir); },
    jump() { scene?.jump(); },
    celebrate() { scene?.celebrate(); },
    destroy() { game.destroy(true); }
  };
}
`);

w('src/game/scenes/PlayScene.ts', `import Phaser from 'phaser';

export interface PlayLevelData { options: readonly string[]; onPick: (index: number) => void; boss: boolean; }

const W = 720; const H = 300;
const OX = [104, 284, 460, 636];
const OY = [196, 156, 188, 148];
const COLORS = [0xff7675, 0x74b9ff, 0x55efc4, 0xffeaa7];
const R = 26;
const START = { x: 360, y: 240 };

export class PlayScene extends Phaser.Scene {
  private level: PlayLevelData = { options: [], onPick: () => undefined, boss: false };
  private built = false;
  private locked = true;
  private dir: -1 | 0 | 1 = 0;
  private jumpQueued = false;
  private owl?: Phaser.Physics.Matter.Sprite;
  private orbs: MatterJS.BodyType[] = [];
  private objects: Phaser.GameObjects.GameObject[] = [];
  private keys: Phaser.Input.Keyboard.Key[] = [];

  constructor() { super('Play'); }

  create(): void {
    this.build();
    this.built = true;
    if (this.level.options.length > 0) this.apply();
  }

  setLevel(data: PlayLevelData): void { this.level = data; if (this.built) this.apply(); }
  setInput(dir: -1 | 0 | 1): void { this.dir = dir; }
  jump(): void { this.jumpQueued = true; }

  celebrate(): void {
    if (!this.owl) return;
    this.tweens.add({ targets: this.owl, scaleX: 1.25, scaleY: 1.25, duration: 140, yoyo: true });
  }

  update(): void {
    const owl = this.owl;
    if (!owl || this.locked) return;
    const left = this.dir === -1 || this.keys.some((k) => k.isDown && (k.keyCode === 37 || k.keyCode === 65));
    const right = this.dir === 1 || this.keys.some((k) => k.isDown && (k.keyCode === 39 || k.keyCode === 68));
    const force = 0.0035;
    if (left && !right) owl.applyForce(new Phaser.Math.Vector2(-force, 0));
    else if (right && !left) owl.applyForce(new Phaser.Math.Vector2(force, 0));
    const vx = owl.body.velocity.x;
    if (Math.abs(vx) > 6) owl.setVelocityX(Math.sign(vx) * 6);
    const jump = this.jumpQueued || this.keys.some((k) => k.isDown && (k.keyCode === 32 || k.keyCode === 38 || k.keyCode === 87));
    if (jump && Math.abs(owl.body.velocity.y) < 0.8) owl.setVelocityY(-9);
    this.jumpQueued = false;
  }

  private build(): void {
    this.makeOwl();
    this.matter.world.setBounds(0, 0, W, H);
    const g = this.add.graphics();
    g.fillStyle(0x77c66e, 1);
    g.fillRect(0, H - 14, W, 14);
    const layer = this.add.graphics();
    layer.fillStyle(0x9be08d, 1);
    layer.lineStyle(3, 0x241c2e, 1);
    for (const p of [{ x: 104, y: 238 }, { x: 284, y: 198 }, { x: 460, y: 230 }, { x: 636, y: 190 }]) {
      layer.fillRoundedRect(p.x - 58, p.y, 116, 14, 7);
      this.matter.add.rectangle(p.x, p.y + 7, 116, 14, { isStatic: true, label: 'plataforma' });
    }
    this.owl = this.matter.add.sprite(START.x, START.y, 'owl');
    this.owl.setFrictionAir(0.03);
    this.owl.setBounce(0.05);
    this.owl.setFixedRotation();
    this.matter.world.on('collisionstart', (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
      if (this.locked) return;
      for (const pair of event.pairs) {
        for (const body of [pair.bodyA, pair.bodyB]) {
          if (!body.label.startsWith('orb-')) continue;
          this.locked = true;
          this.level.onPick(Number(body.label.slice(4)));
          return;
        }
      }
    });
    const kb = this.input.keyboard;
    if (kb) {
      kb.addCapture(['LEFT', 'RIGHT', 'UP', 'SPACE', 'A', 'D', 'W']);
      for (const code of ['LEFT', 'RIGHT', 'UP', 'SPACE', 'A', 'D', 'W']) {
        const key = kb.addKey(Phaser.Input.Keyboard.KeyCodes[code as keyof typeof Phaser.Input.Keyboard.KeyCodes]);
        this.keys.push(key);
      }
    }
  }

  private apply(): void {
    for (const body of this.orbs) this.matter.world.remove(body);
    for (const obj of this.objects) obj.destroy();
    this.orbs = [];
    this.objects = [];
    this.locked = false;
    this.dir = 0;
    this.cameras.main.setBackgroundColor(this.level.boss ? '#2b1b3d' : '#dff6ff');
    if (this.owl) { this.owl.setPosition(START.x, START.y); this.owl.setVelocity(0, 0); }

    this.level.options.forEach((text, i) => {
      const x = OX[i] ?? 104; const y = OY[i] ?? 196;
      this.orbs.push(this.matter.add.circle(x, y, R, { isStatic: true, isSensor: true, label: 'orb-' + i }));
      const circle = this.add.graphics();
      circle.fillStyle(COLORS[i] ?? 0xffeaa7, 1);
      circle.lineStyle(3, 0x241c2e, 1);
      circle.fillCircle(x, y, R);
      circle.strokeCircle(x, y, R);
      const label = this.add.text(x, y, text, { fontFamily: 'Inter, sans-serif', fontSize: '15px', fontStyle: 'bold', color: '#241c2e' }).setOrigin(0.5);
      this.objects.push(circle, label);
    });
  }

  private makeOwl(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x8e7cf0, 1);
    g.lineStyle(3, 0x241c2e, 1);
    g.fillEllipse(22, 28, 32, 38);
    g.strokeEllipse(22, 28, 32, 38);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(15, 20, 8); g.fillCircle(29, 20, 8);
    g.fillStyle(0x241c2e, 1);
    g.fillCircle(15, 20, 3.4); g.fillCircle(29, 20, 3.4);
    g.fillStyle(0xfdcb6e, 1);
    g.fillTriangle(22, 27, 18, 33, 26, 33);
    g.generateTexture('owl', 44, 50);
    g.destroy();
  }
}
`);

w('src/styles/tokens.css', `:root {
  --color-primary: #6c5ce7;
  --color-primary-strong: #4834d4;
  --color-primary-soft: #efeaff;
  --color-secondary: #fdcb6e;
  --color-success: #00b894;
  --color-success-soft: #e3f7ee;
  --color-error: #d63031;
  --color-error-soft: #fdecea;
  --color-ink: #2d3436;
  --color-ink-soft: #636e72;
  --color-surface: #fdfbf7;
  --color-surface-raised: #ffffff;
  --color-border: #dfe6e9;
  --color-arena: #dff6ff;
  --font-display: 'Fredoka', system-ui, sans-serif;
  --font-reading: 'Inter', system-ui, sans-serif;
  --font-scale: 1;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 24px; --space-6: 32px;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px; --radius-pill: 999px;
  --shadow-press: 0 3px 0 var(--color-primary-strong);
  --focus-ring: 0 0 0 3px #74b9ff;
  --tap: 48px;
}
:root[data-contrast='high'] {
  --color-ink: #000; --color-ink-soft: #000; --color-surface: #fff; --color-surface-raised: #fff;
  --color-border: #000; --color-primary: #3a0f9e; --focus-ring: 0 0 0 3px #000;
}
:root[data-dyslexia='on'] body { font-family: 'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif; letter-spacing: 0.02em; }
`);

w('src/styles/base.css', `*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { min-height: 100dvh; background: linear-gradient(160deg, #efeaff, #fdfbf7 45%, #fff3d9); color: var(--color-ink); font-family: var(--font-reading); font-size: calc(16px * var(--font-scale)); line-height: 1.5; }
#app { min-height: 100dvh; display: flex; justify-content: center; padding: var(--space-4); }
.screen { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: var(--space-4); }
h1, h2 { font-family: var(--font-display); margin: 0; line-height: 1.15; }
h1 { font-size: calc(26px * var(--font-scale)); }
p { margin: 0; }
:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-sm); }
`);

w('src/styles/ui.css', `.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: var(--tap); padding: var(--space-3) var(--space-5); border: 0; border-radius: var(--radius-md); font-family: var(--font-display); font-size: calc(17px * var(--font-scale)); font-weight: 600; cursor: pointer; }
.btn--primary { background: var(--color-primary); color: #fff; box-shadow: var(--shadow-press); }
.btn--ghost { background: var(--color-surface-raised); color: var(--color-ink); border: 2px solid var(--color-border); }
.btn--icon { min-width: var(--tap); padding: var(--space-2); }
.card { background: var(--color-surface-raised); border: 2px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); }
.topbar { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.streak { display: inline-flex; align-items: center; gap: 2px; margin-left: var(--space-2); }
.chip { display: inline-flex; align-items: center; gap: var(--space-1); padding: var(--space-1) var(--space-3); border-radius: var(--radius-pill); background: var(--color-primary-soft); color: var(--color-primary-strong); font-family: var(--font-display); font-size: calc(14px * var(--font-scale)); }
.world-list, .level-list, .stat-list, .shop-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.world { width: 100%; display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); border: 3px solid var(--world); border-radius: var(--radius-lg); background: var(--world-soft); text-align: left; cursor: pointer; font-family: var(--font-display); }
.world.is-locked { filter: grayscale(0.7); opacity: 0.7; }
.world__icon { color: var(--world); }
.world__body { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.world__name { font-size: calc(17px * var(--font-scale)); font-weight: 700; }
.world__desc, .world__meta { font-family: var(--font-reading); font-size: calc(13px * var(--font-scale)); color: var(--color-ink-soft); }
.level { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-4); border: 2px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface-raised); }
.level__stars { display: flex; gap: 2px; color: var(--color-secondary); }
.level__stars .is-off { color: var(--color-border); }
.level__actions { display: flex; gap: var(--space-2); }
.level__actions .btn { flex: 1; }
.hud { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.hud__progress { font-family: var(--font-display); color: var(--color-ink-soft); }
.hud__timer { font-family: var(--font-display); color: var(--color-error); font-weight: 700; }
.question { font-size: calc(18px * var(--font-scale)); font-weight: 700; }
.visual { display: flex; justify-content: center; gap: var(--space-5); padding: var(--space-3); background: var(--color-surface-raised); border: 2px dashed var(--color-border); border-radius: var(--radius-lg); min-height: 96px; align-items: center; }
.visual__label { font-family: var(--font-display); font-size: calc(15px * var(--font-scale)); text-align: center; }
.arena { width: 100%; aspect-ratio: 720 / 300; border: 2px solid var(--color-primary); border-radius: var(--radius-lg); overflow: hidden; background: var(--color-arena); touch-action: none; }
.controls, .bottom-nav, .map-footer { display: flex; gap: var(--space-2); }
.bottom-nav .btn { flex: 1; }
.options { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
.option { min-height: 60px; padding: var(--space-3); border: 2px solid var(--color-primary); border-radius: var(--radius-md); background: var(--color-surface-raised); font-family: var(--font-display); font-size: calc(17px * var(--font-scale)); font-weight: 600; cursor: pointer; }
.option.is-correct { background: var(--color-success); border-color: var(--color-success); color: #fff; }
.option.is-wrong { background: var(--color-error); border-color: var(--color-error); color: #fff; }
.feedback { border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); }
.feedback.is-correct { background: var(--color-success-soft); border: 2px solid var(--color-success); }
.feedback.is-wrong { background: var(--color-error-soft); border: 2px solid var(--color-error); }
.feedback__title { font-family: var(--font-display); font-size: calc(18px * var(--font-scale)); font-weight: 700; }
.feedback__label { font-size: calc(13px * var(--font-scale)); text-transform: uppercase; color: var(--color-ink-soft); font-weight: 700; }
.complete { align-items: center; text-align: center; }
.complete__stars { display: flex; gap: var(--space-2); color: var(--color-secondary); }
.complete__stars .is-off { color: var(--color-border); }
.complete__actions { display: flex; flex-direction: column; gap: var(--space-2); width: 100%; }
.sheet { border: 0; border-radius: var(--radius-lg) var(--radius-lg) 0 0; padding: var(--space-4); width: min(520px, 100%); margin: auto auto 0; background: var(--color-surface); }
.sheet::backdrop { background: rgb(20 15 27 / 55%); }
.sheet__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); }
.sheet__body { display: flex; flex-direction: column; gap: var(--space-3); }
.row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); padding: var(--space-3); border: 2px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface-raised); }
.achievement-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2); }
.achievement { display: flex; align-items: center; gap: var(--space-1); padding: var(--space-2); border: 2px solid var(--color-border); border-radius: var(--radius-sm); font-size: calc(12px * var(--font-scale)); opacity: 0.45; }
.achievement.is-unlocked { opacity: 1; border-color: var(--color-secondary); background: var(--color-primary-soft); }
.shop-item { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-3); border: 2px solid var(--color-border); border-radius: var(--radius-md); }
.shop-item__preview { height: 40px; border-radius: var(--radius-sm); border: 2px solid var(--color-border); }
.tabs { display: flex; gap: var(--space-2); }
.tab { flex: 1; padding: var(--space-2); border: 2px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-surface-raised); font-family: var(--font-display); cursor: pointer; }
.tab.is-active { background: var(--color-primary); color: #fff; }
.gate-input { width: 100%; padding: var(--space-3); font-size: calc(18px * var(--font-scale)); border: 2px solid var(--color-border); border-radius: var(--radius-md); }
.report-table { width: 100%; border-collapse: collapse; }
.report-table th, .report-table td { border: 1px solid var(--color-border); padding: var(--space-2); text-align: left; }
.profile-owl { display: flex; justify-content: center; }
`);

console.log('Bloco 5 concluido: jogo, UI e estilos criados.');