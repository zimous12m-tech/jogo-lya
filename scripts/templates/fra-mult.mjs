export default [
  (h) => {
    const a = h.int(1, 4); const b = h.int(2, 6); const c = h.int(1, 4); const d = h.int(2, 6);
    const correct = (a * c) + '/' + (b * d);
    return { subtipo: 'multiplicacao',
      pt: 'Quanto e ' + a + '/' + b + ' x ' + c + '/' + d + '?',
      en: 'What is ' + a + '/' + b + ' x ' + c + '/' + d + '?',
      ep: 'Numeradores e denominadores entre si: ' + correct + '.',
      ee: 'Numerators and denominators together: ' + correct + '.',
      correct, wrongs: [(a + c) + '/' + (b + d), (a * d) + '/' + (b * c)], near: (a * c + 1) + '/' + (b * d) };
  },
  (h) => {
    const den = h.pick([4, 5, 8, 10]);
    const n = h.int(1, den - 1);
    const total = den * h.int(2, 5);
    const correct = (total / den) * n;
    return { subtipo: 'fracao-de-quantidade',
      pt: 'Quanto e ' + n + '/' + den + ' de ' + total + '?',
      en: 'What is ' + n + '/' + den + ' of ' + total + '?',
      ep: total + ' / ' + den + ' x ' + n + ' = ' + correct + '.',
      ee: total + ' / ' + den + ' x ' + n + ' = ' + correct + '.',
      correct, wrongs: [total / den, total - correct], near: correct + 1 };
  },
  (h) => {
    const den = h.pick([4, 5, 8]);
    const n = h.int(1, den - 1);
    const preco = den * h.int(2, 6);
    const correct = (preco / den) * n;
    return { subtipo: 'contexto',
      pt: 'Um casaco custa ' + preco + ' EUR com ' + n + '/' + den + ' de desconto. Quanto poupas?',
      en: 'A coat costs ' + preco + ' EUR with ' + n + '/' + den + ' off. How much do you save?',
      ep: n + '/' + den + ' de ' + preco + ' = ' + correct + ' EUR.',
      ee: n + '/' + den + ' of ' + preco + ' = ' + correct + ' EUR.',
      correct, wrongs: [preco / den, preco - correct], near: correct + 1 };
  }
];
