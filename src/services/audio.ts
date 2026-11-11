type Sfx = 'click' | 'correct' | 'wrong' | 'coin' | 'star' | 'jump';

let ctx: AudioContext | null = null;
let sound = true;
let music = true;

function audio(): AudioContext | null {
  if (!ctx) { try { ctx = new AudioContext(); } catch { return null; } }
  return ctx;
}

const TONES: Record<Sfx, readonly [number, number, OscillatorType]> = {
  click: [520, 0.05, 'sine'], correct: [660, 0.14, 'sine'], wrong: [200, 0.2, 'sawtooth'],
  coin: [880, 0.08, 'triangle'], star: [990, 0.12, 'sine'], jump: [440, 0.06, 'sine']
};

export function play(sfx: Sfx): void {
  if (!sound) return;
  const context = audio();
  if (!context) return;
  const [frequency, duration, type] = TONES[sfx];
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.1, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

const NOTES = [261.6, 329.6, 392, 329.6, 293.7, 349.2, 440, 349.2];
let loop: number | null = null;
let step = 0;

export function startMusic(): void {
  if (loop !== null) return;
  loop = window.setInterval(() => {
    if (!music) return;
    const context = audio();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.value = NOTES[step % NOTES.length] ?? 261.6;
    gain.gain.setValueAtTime(0.02, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.85);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.85);
    step += 1;
  }, 900);
}

export function stopMusic(): void {
  if (loop !== null) window.clearInterval(loop);
  loop = null;
}

export function configure(soundOn: boolean, musicOn: boolean): void {
  sound = soundOn;
  const before = music;
  music = musicOn;
  if (music && !before) startMusic();
  if (!music) stopMusic();
}
