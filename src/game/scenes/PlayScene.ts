import Phaser from 'phaser';

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
    const body = owl?.body;
    if (!owl || !body || this.locked) return;

    const left = this.dir === -1 || this.keys.some((k) => k.isDown && (k.keyCode === 37 || k.keyCode === 65));
    const right = this.dir === 1 || this.keys.some((k) => k.isDown && (k.keyCode === 39 || k.keyCode === 68));
    const force = 0.0035;
    if (left && !right) owl.applyForce(new Phaser.Math.Vector2(-force, 0));
    else if (right && !left) owl.applyForce(new Phaser.Math.Vector2(force, 0));

    const vx = body.velocity.x;
    if (Math.abs(vx) > 6) owl.setVelocityX(Math.sign(vx) * 6);

    const jump = this.jumpQueued || this.keys.some((k) => k.isDown && (k.keyCode === 32 || k.keyCode === 38 || k.keyCode === 87));
    if (jump && Math.abs(body.velocity.y) < 0.8) owl.setVelocityY(-9);
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
        for (const b of [pair.bodyA, pair.bodyB]) {
          if (!b.label.startsWith('orb-')) continue;
          this.locked = true;
          this.level.onPick(Number(b.label.slice(4)));
          return;
        }
      }
    });
    const kb = this.input.keyboard;
    if (kb) {
      kb.addCapture(['LEFT', 'RIGHT', 'UP', 'SPACE', 'A', 'D', 'W']);
      for (const code of ['LEFT', 'RIGHT', 'UP', 'SPACE', 'A', 'D', 'W']) {
        this.keys.push(kb.addKey(Phaser.Input.Keyboard.KeyCodes[code as keyof typeof Phaser.Input.Keyboard.KeyCodes]));
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
