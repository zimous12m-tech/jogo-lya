export default [
  (h, d) => {
    const c = h.int(2, d === 3 ? 20 : 10); const l = h.int(2, d === 3 ? 20 : 10);
    const correct = c * l;
    return { subtipo: 'area',
      pt: 'Um retangulo tem ' + c + ' cm por ' + l + ' cm. Qual e a area?',
      en: 'A rectangle is ' + c + ' cm by ' + l + ' cm. What is the area?',
      ep: c + ' x ' + l + ' = ' + correct + ' cm2.',
      ee: c + ' x ' + l + ' = ' + correct + ' cm2.',
      correct, wrongs: [2 * (c + l), c + l], near: correct + c };
  },
  (h) => {
    const l = h.int(2, 12);
    const correct = l * l;
    return { subtipo: 'area',
      pt: 'Um quadrado tem ' + l + ' cm de lado. Qual e a area?',
      en: 'A square has ' + l + ' cm sides. What is the area?',
      ep: l + ' x ' + l + ' = ' + correct + ' cm2.',
      ee: l + ' x ' + l + ' = ' + correct + ' cm2.',
      correct, wrongs: [4 * l, 2 * l], near: correct + l };
  },
  (h) => {
    const base = h.pick([4, 6, 8, 10]); const altura = h.pick([3, 5, 7]);
    const correct = (base * altura) / 2;
    return { subtipo: 'area',
      pt: 'Um triangulo tem base ' + base + ' cm e altura ' + altura + ' cm. Qual e a area?',
      en: 'A triangle has base ' + base + ' cm and height ' + altura + ' cm. What is the area?',
      ep: base + ' x ' + altura + ' / 2 = ' + correct + ' cm2.',
      ee: base + ' x ' + altura + ' / 2 = ' + correct + ' cm2.',
      correct, wrongs: [base * altura, base + altura], near: correct + 1 };
  }
];
