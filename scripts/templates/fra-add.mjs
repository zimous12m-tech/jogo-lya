export default [
  (h) => {
    const den = h.pick([4, 5, 6, 8, 10]);
    const a = h.int(1, den - 2);
    const b = h.int(1, den - a);
    const correct = (a + b) + '/' + den;
    return { subtipo: 'adicao',
      pt: 'Quanto e ' + a + '/' + den + ' + ' + b + '/' + den + '?',
      en: 'What is ' + a + '/' + den + ' + ' + b + '/' + den + '?',
      ep: 'Somam-se os numeradores: ' + correct + '.',
      ee: 'Add the numerators: ' + correct + '.',
      correct, wrongs: [(a + b) + '/' + (den * 2), (a * b) + '/' + den], near: (a + b + 1) + '/' + den };
  },
  (h) => {
    const small = h.pick([2, 3, 4]);
    const big = small * h.pick([2, 3]);
    const a = h.int(1, small - 1);
    const b = h.int(1, big - 1);
    const correct = (a * (big / small) + b) + '/' + big;
    return { subtipo: 'adicao',
      pt: 'Quanto e ' + a + '/' + small + ' + ' + b + '/' + big + '?',
      en: 'What is ' + a + '/' + small + ' + ' + b + '/' + big + '?',
      ep: 'Reduz ao mesmo denominador: ' + correct + '.',
      ee: 'Use a common denominator: ' + correct + '.',
      correct, wrongs: [(a + b) + '/' + (small + big), (a + b) + '/' + big], near: (a * (big / small) + b + 1) + '/' + big };
  },
  (h) => {
    const den = h.pick([4, 6, 8, 10]);
    const a = h.int(1, den - 2);
    const b = h.int(1, den - a);
    const correct = (a + b) + '/' + den;
    return { subtipo: 'contexto',
      pt: 'O Tomas comeu ' + a + '/' + den + ' de um bolo e a irma ' + b + '/' + den + '. Que fracao comeram juntos?',
      en: 'Tom ate ' + a + '/' + den + ' of a cake and his sister ' + b + '/' + den + '. What fraction together?',
      ep: a + '/' + den + ' + ' + b + '/' + den + ' = ' + correct + '.',
      ee: a + '/' + den + ' + ' + b + '/' + den + ' = ' + correct + '.',
      correct, wrongs: [(a + b) + '/' + (den * 2), (a * b) + '/' + den], near: (a + b + 1) + '/' + den,
      visual: { tipo: 'pizza', fatias: den, comidas: a + b } };
  }
];
