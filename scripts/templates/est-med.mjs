const exato = (h, k, min, max) => {
  for (let t = 0; t < 80; t += 1) {
    const values = Array.from({ length: k }, () => h.int(min, max));
    const sum = values.reduce((a, b) => a + b, 0);
    if (sum % k === 0) return { values, sum, mean: sum / k };
  }
  throw new Error('sem media inteira');
};

export default [
  (h) => {
    const { values, sum, mean } = exato(h, 4, 4, 20);
    return { subtipo: 'media',
      pt: 'Qual e a media de ' + values.join(', ') + '?',
      en: 'What is the mean of ' + values.join(', ') + '?',
      ep: sum + ' / 4 = ' + mean + '.',
      ee: sum + ' / 4 = ' + mean + '.',
      correct: mean, wrongs: [sum, mean + 2], near: mean + 1 };
  },
  (h) => {
    const repetido = h.int(2, 4); const outro = h.int(5, 20);
    const values = [outro, outro, outro + 5, outro + 9];
    return { subtipo: 'moda',
      pt: 'Qual e a moda de ' + values.join(', ') + '?',
      en: 'What is the mode of ' + values.join(', ') + '?',
      ep: 'A moda e ' + outro + ', o valor mais repetido.',
      ee: 'The mode is ' + outro + ', the most frequent.',
      correct: outro, wrongs: [outro + 5, outro + 9], near: outro + 1 };
  },
  (h) => {
    const base = h.int(5, 15);
    const values = [base - 4, base - 2, base, base + 2, base + 4];
    return { subtipo: 'mediana',
      pt: 'Qual e a mediana de ' + values.join(', ') + '?',
      en: 'What is the median of ' + values.join(', ') + '?',
      ep: 'O valor do meio e ' + base + '.',
      ee: 'The middle value is ' + base + '.',
      correct: base, wrongs: [values[0], values[4]], near: base + 1 };
  }
];
