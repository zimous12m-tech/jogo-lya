import Phaser from 'phaser';
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
