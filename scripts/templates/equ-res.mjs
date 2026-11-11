export default [
  (h) => {
    const x = h.int(2, 15); const a = h.int(2, 20);
    return { subtipo: 'resolucao',
      pt: 'Resolve x + ' + a + ' = ' + (x + a) + '.',
      en: 'Solve x + ' + a + ' = ' + (x + a) + '.',
      ep: 'x = ' + (x + a) + ' - ' + a + ' = ' + x + '.',
      ee: 'x = ' + (x + a) + ' - ' + a + ' = ' + x + '.',
      correct: x, wrongs: [x + a, x + 2 * a], near: x + 1 };
  },
  (h) => {
    const a = h.int(2, 6); const x = h.int(2, 10); const b = h.int(1, 9);
    return { subtipo: 'resolucao',
      pt: 'Resolve ' + a + 'x + ' + b + ' = ' + (a * x + b) + '.',
      en: 'Solve ' + a + 'x + ' + b + ' = ' + (a * x + b) + '.',
      ep: a + 'x = ' + (a * x) + ', logo x = ' + x + '.',
      ee: a + 'x = ' + (a * x) + ', so x = ' + x + '.',
      correct: x, wrongs: [a * x + b - b, a * x + b], near: x + 1 };
  },
  (h) => {
    const a = h.int(2, 6); const x = h.int(2, 10); const b = h.int(1, 9);
    return { subtipo: 'resolucao',
      pt: 'Resolve ' + a + 'x - ' + b + ' = ' + (a * x - b) + '.',
      en: 'Solve ' + a + 'x - ' + b + ' = ' + (a * x - b) + '.',
      ep: a + 'x = ' + (a * x) + ', logo x = ' + x + '.',
      ee: a + 'x = ' + (a * x) + ', so x = ' + x + '.',
      correct: x, wrongs: [a * x - b, a * x - b + b], near: x + 1 };
  }
];
