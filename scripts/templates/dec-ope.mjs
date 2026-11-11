export default [
  (h) => {
    const a = h.int(10, 90) / 10; const b = h.int(10, 90) / 10;
    const correct = h.round(a + b);
    return { subtipo: 'adicao',
      pt: 'Quanto e ' + h.pt(a) + ' + ' + h.pt(b) + '?',
      en: 'What is ' + a + ' + ' + b + '?',
      ep: 'Alinha as virgulas: ' + h.pt(a) + ' + ' + h.pt(b) + ' = ' + h.pt(correct) + '.',
      ee: 'Line up the points: ' + a + ' + ' + b + ' = ' + correct + '.',
      correct: h.pt(correct), wrongs: [h.pt(Math.abs(a - b)), h.pt(correct + 1)], near: h.pt(correct + 2) };
  },
  (h) => {
    const a = h.int(30, 90) / 10; const b = h.int(10, 29) / 10;
    const correct = h.round(a - b);
    return { subtipo: 'subtracao',
      pt: 'Quanto e ' + h.pt(a) + ' - ' + h.pt(b) + '?',
      en: 'What is ' + a + ' - ' + b + '?',
      ep: h.pt(a) + ' - ' + h.pt(b) + ' = ' + h.pt(correct) + '.',
      ee: a + ' - ' + b + ' = ' + correct + '.',
      correct: h.pt(correct), wrongs: [h.pt(b), h.pt(a + b)], near: h.pt(correct + 1) };
  },
  (h) => {
    const a = h.int(2, 9) / 10; const b = h.int(2, 9);
    const correct = h.round(a * b);
    return { subtipo: 'multiplicacao',
      pt: 'Quanto e ' + h.pt(a) + ' x ' + b + '?',
      en: 'What is ' + a + ' x ' + b + '?',
      ep: h.pt(a) + ' x ' + b + ' = ' + h.pt(correct) + '.',
      ee: a + ' x ' + b + ' = ' + correct + '.',
      correct: h.pt(correct), wrongs: [h.pt(a + b), h.pt(correct * 10)], near: h.pt(correct + 1) };
  }
];
