export default [
  (h, d) => {
    const base = h.int(2, d === 3 ? 12 : 8);
    const correct = base * base;
    return { subtipo: 'calculo',
      pt: 'Quanto e ' + base + ' ao quadrado?',
      en: 'What is ' + base + ' squared?',
      ep: base + ' x ' + base + ' = ' + correct + '.',
      ee: base + ' x ' + base + ' = ' + correct + '.',
      correct, wrongs: [base * 2, base + 2], near: correct + base };
  },
  (h) => {
    const base = h.int(2, 6);
    const correct = base ** 3;
    return { subtipo: 'calculo',
      pt: 'Quanto e ' + base + ' ao cubo?',
      en: 'What is ' + base + ' cubed?',
      ep: base + ' x ' + base + ' x ' + base + ' = ' + correct + '.',
      ee: base + ' x ' + base + ' x ' + base + ' = ' + correct + '.',
      correct, wrongs: [base * 3, base * base], near: correct + base };
  },
  (h) => {
    const raiz = h.int(3, 12);
    return { subtipo: 'raiz',
      pt: 'Qual e a raiz quadrada de ' + (raiz * raiz) + '?',
      en: 'What is the square root of ' + (raiz * raiz) + '?',
      ep: raiz + ' x ' + raiz + ' = ' + (raiz * raiz) + ', logo a raiz e ' + raiz + '.',
      ee: raiz + ' x ' + raiz + ' = ' + (raiz * raiz) + ', so the root is ' + raiz + '.',
      correct: raiz, wrongs: [raiz * raiz, raiz * 2], near: raiz + 1 };
  }
];
