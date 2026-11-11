export default [
  () => ({ subtipo: 'calculo',
    pt: 'Lancam um dado equilibrado. Qual e a probabilidade de sair 6?',
    en: 'A fair die is rolled. What is the probability of rolling 6?',
    ep: 'Um caso favoravel em 6: 1/6.',
    ee: 'One favourable in 6: 1/6.',
    correct: '1/6', wrongs: ['6/1', '5/6'], near: '1/5' }),
  (h) => {
    const fav = h.int(2, 7); const total = fav + h.int(2, 8);
    return { subtipo: 'calculo',
      pt: 'Um saco tem ' + fav + ' verdes e ' + (total - fav) + ' azuis. Probabilidade de tirar verde?',
      en: 'A bag has ' + fav + ' green and ' + (total - fav) + ' blue. Probability of green?',
      ep: fav + ' casos favoraveis em ' + total + ': ' + fav + '/' + total + '.',
      ee: fav + ' favourable in ' + total + ': ' + fav + '/' + total + '.',
      correct: fav + '/' + total, wrongs: [fav + '/' + (total - fav), (total - fav) + '/' + total], near: (fav + 1) + '/' + total };
  },
  (h) => {
    const fav = h.int(2, 6); const total = fav + h.int(3, 9);
    return { subtipo: 'complementar',
      pt: 'Um saco tem ' + fav + ' vermelhas e ' + (total - fav) + ' brancas. Probabilidade de NAO tirar vermelha?',
      en: 'A bag has ' + fav + ' red and ' + (total - fav) + ' white. Probability of NOT red?',
      ep: (total - fav) + ' em ' + total + ': ' + (total - fav) + '/' + total + '.',
      ee: (total - fav) + ' out of ' + total + ': ' + (total - fav) + '/' + total + '.',
      correct: (total - fav) + '/' + total, wrongs: [fav + '/' + total, fav + '/' + (total - fav)], near: (total - fav + 1) + '/' + total };
  }
];
