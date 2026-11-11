export default [
  (h) => {
    const den = h.pick([4, 5, 6, 8]);
    const n = h.int(1, den - 1);
    const bigger = h.pick([2, 3]);
    const correct = n + '/' + den;
    return { subtipo: 'comparacao',
      pt: 'Qual e maior: ' + n + '/' + den + ' ou ' + n + '/' + (den * bigger) + '?',
      en: 'Which is bigger: ' + n + '/' + den + ' or ' + n + '/' + (den * bigger) + '?',
      ep: 'Mesmo numerador, menor denominador e maior: ' + correct + '.',
      ee: 'Same numerator, smaller denominator is bigger: ' + correct + '.',
      correct, wrongs: [n + '/' + (den * bigger), n + '/' + (den * bigger + 1)], near: (n + 1) + '/' + den,
      visual: { tipo: 'fracaoComparada', a: { n, d: den }, b: { n, d: den * bigger } } };
  },
  (h) => {
    const den = h.pick([5, 7, 9]);
    const a = h.int(1, den - 2);
    const b = h.int(a + 1, den - 1);
    const correct = b + '/' + den;
    return { subtipo: 'comparacao',
      pt: 'Qual e maior: ' + a + '/' + den + ' ou ' + b + '/' + den + '?',
      en: 'Which is bigger: ' + a + '/' + den + ' or ' + b + '/' + den + '?',
      ep: 'Mesmo denominador, maior numerador: ' + correct + '.',
      ee: 'Same denominator, bigger numerator: ' + correct + '.',
      correct, wrongs: [a + '/' + den, a + '/' + (den + 1)], near: (b + 1) + '/' + den };
  },
  (h) => {
    const den = h.pick([6, 8, 10]);
    const correct = (den - 1) + '/' + den;
    return { subtipo: 'comparacao',
      pt: 'Qual esta mais perto de 1: ' + correct + ' ou 1/2?',
      en: 'Which is closer to 1: ' + correct + ' or 1/2?',
      ep: correct + ' so precisa de 1/' + den + ' para chegar a 1.',
      ee: correct + ' needs only 1/' + den + ' to reach 1.',
      correct, wrongs: ['1/2', (den - 2) + '/' + den], near: (den - 1) + '/' + (den + 1) };
  }
];
