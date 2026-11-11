export default [
  (h, d) => {
    const a = h.int(d === 1 ? 1 : 5, d === 3 ? 40 : 15);
    const b = h.int(d === 1 ? 1 : 5, d === 3 ? 40 : 15);
    const correct = a - b;
    return { subtipo: 'soma',
      pt: 'Quanto e ' + a + ' - ' + b + '?',
      en: 'What is ' + a + ' - ' + b + '?',
      ep: a + ' - ' + b + ' = ' + correct + '.',
      ee: a + ' - ' + b + ' = ' + correct + '.',
      correct, wrongs: [a + b, -correct], near: correct + 1 };
  },
  (h, d) => {
    const n = h.int(1, d === 3 ? 50 : 20);
    return { subtipo: 'simetrico',
      pt: 'Qual e o simetrico de -' + n + '?',
      en: 'What is the opposite of -' + n + '?',
      ep: 'O simetrico e ' + n + '.',
      ee: 'The opposite is ' + n + '.',
      correct: n, wrongs: [-n, 0], near: n + 1 };
  },
  (h) => {
    const floor = -h.int(1, 6);
    const up = h.int(2, 10);
    const correct = floor + up;
    return { subtipo: 'deslocamento',
      pt: 'Um elevador esta no piso ' + floor + ' e sobe ' + up + '. Em que piso fica?',
      en: 'A lift is on floor ' + floor + ' and goes up ' + up + '. Which floor?',
      ep: floor + ' + ' + up + ' = ' + correct + '.',
      ee: floor + ' + ' + up + ' = ' + correct + '.',
      correct, wrongs: [floor - up, -correct], near: correct + 1 };
  }
];
