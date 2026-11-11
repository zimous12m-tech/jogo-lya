export default [
  (h) => {
    const pos = h.int(2, 9); const gap = h.int(3, 6);
    const correct = gap - 1;
    return { subtipo: 'ordem',
      pt: 'Numa fila, a Ana e a ' + pos + '.a e o Rui o ' + (pos + gap) + '.o. Quantos estao entre eles?',
      en: 'In a queue Ana is ' + pos + 'th and Rui ' + (pos + gap) + 'th. How many are between?',
      ep: 'Entre eles estao ' + correct + ' pessoas.',
      ee: 'Between them are ' + correct + ' people.',
      correct, wrongs: [gap, gap + 1], near: correct - 1 };
  },
  () => ({ subtipo: 'deducao',
    pt: 'A e mais velha do que B e C e mais nova do que B. Quem e a mais velha?',
    en: 'A is older than B and C is younger than B. Who is oldest?',
    ep: 'A > B > C, logo A.',
    ee: 'A > B > C, so A.',
    correct: 'A', wrongs: ['B', 'C'], near: 'Nao e possivel saber' }),
  (h) => {
    const sobe = h.int(3, 5); const desce = sobe - 1; const altura = sobe * h.int(2, 4);
    const dias = Math.ceil((altura - sobe) / (sobe - desce)) + 1;
    return { subtipo: 'raciocinio',
      pt: 'Um caracol sobe ' + sobe + ' m por dia e escorrega ' + desce + ' m por noite. Quantos dias para sair de ' + altura + ' m?',
      en: 'A snail climbs ' + sobe + ' m a day and slips ' + desce + ' m a night. How many days for ' + altura + ' m?',
      ep: 'Avanca ' + (sobe - desce) + ' m por dia. Sai ao dia ' + dias + '.',
      ee: 'It gains ' + (sobe - desce) + ' m a day. It leaves on day ' + dias + '.',
      correct: dias, wrongs: [altura, dias + 1], near: dias - 1 };
  }
];
