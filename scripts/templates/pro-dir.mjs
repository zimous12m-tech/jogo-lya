export default [
  (h) => {
    const unit = h.int(2, 6); const n = h.int(2, 5); const m = n + h.int(2, 4);
    const correct = unit * m;
    return { subtipo: 'direta',
      pt: 'Se ' + n + ' cadernos custam ' + (unit * n) + ' EUR, quanto custam ' + m + '?',
      en: 'If ' + n + ' notebooks cost ' + (unit * n) + ' EUR, how much do ' + m + ' cost?',
      ep: 'Um custa ' + unit + ' EUR, ' + m + ' custam ' + correct + ' EUR.',
      ee: 'One costs ' + unit + ' EUR, ' + m + ' cost ' + correct + ' EUR.',
      correct, wrongs: [unit * n, unit * (m - 1)], near: correct + unit };
  },
  (h) => {
    const pessoas = h.int(2, 4); const gramas = pessoas * h.int(40, 80); const alvo = pessoas * 2;
    const correct = (gramas / pessoas) * alvo;
    return { subtipo: 'receita',
      pt: 'Uma receita para ' + pessoas + ' leva ' + gramas + ' g. Quantos g para ' + alvo + '?',
      en: 'A recipe for ' + pessoas + ' uses ' + gramas + ' g. How many g for ' + alvo + '?',
      ep: 'Por pessoa ' + (gramas / pessoas) + ' g, para ' + alvo + ' sao ' + correct + ' g.',
      ee: 'Per person ' + (gramas / pessoas) + ' g, for ' + alvo + ' it is ' + correct + ' g.',
      correct, wrongs: [gramas, gramas * 3], near: correct + 10 };
  },
  (h) => {
    const km = h.pick([2, 3, 4, 5]);
    return { subtipo: 'escala',
      pt: 'No mapa, ' + km + ' cm representam ' + km + ' km. Quantos km representam ' + (km * 2) + ' cm?',
      en: 'On the map, ' + km + ' cm is ' + km + ' km. How many km is ' + (km * 2) + ' cm?',
      ep: 'O dobro: ' + (km * 2) + ' km.',
      ee: 'Double: ' + (km * 2) + ' km.',
      correct: km * 2, wrongs: [km, km * 4], near: km * 2 + 1 };
  }
];
