let seed = 20261110;

export const setSeed = (value) => { seed = value >>> 0; };

export const rnd = () => {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const int = (min, max) => min + Math.floor(rnd() * (max - min + 1));
export const pick = (list) => list[Math.floor(rnd() * list.length)];
export const round = (value, casas = 1) => Math.round(value * 10 ** casas) / 10 ** casas;
export const pt = (value) => String(round(value, 2)).replace('.', ',');

export const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

export const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export function build(correct, wrongs, near) {
  const options = [String(correct), ...wrongs.map(String), String(near)];
  assert(options.length === 4, 'esperava 4 opcoes');
  assert(new Set(options).size === 4, 'opcoes colidem: ' + options.join(' | '));
  const shuffled = shuffle(options);
  return { opcoes: shuffled, resposta: shuffled.indexOf(String(correct)) };
}
