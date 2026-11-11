export default [
  (h) => {
    const p = h.pick([10, 20, 25, 50]); const total = h.pick([40, 60, 80, 100, 120]);
    const correct = (total * p) / 100;
    return { subtipo: 'calculo',
      pt: 'Quanto e ' + p + ' % de ' + total + '?',
      en: 'What is ' + p + ' % of ' + total + '?',
      ep: total + ' / 100 x ' + p + ' = ' + correct + '.',
      ee: total + ' / 100 x ' + p + ' = ' + correct + '.',
      correct, wrongs: [total * p, total / p], near: correct + 5 };
  },
  (h) => {
    const preco = h.pick([40, 60, 80, 100]); const p = h.pick([10, 20, 25]);
    const desconto = (preco * p) / 100; const correct = preco - desconto;
    return { subtipo: 'desconto',
      pt: 'Um casaco custa ' + preco + ' EUR com ' + p + ' % de desconto. Quanto pagas?',
      en: 'A coat costs ' + preco + ' EUR with ' + p + ' % off. How much do you pay?',
      ep: preco + ' - ' + desconto + ' = ' + correct + ' EUR.',
      ee: preco + ' - ' + desconto + ' = ' + correct + ' EUR.',
      correct, wrongs: [desconto, preco + desconto], near: correct + 5,
      visual: { tipo: 'desconto', precoCentimos: preco * 100, percentagem: p } };
  },
  (h) => {
    const saldo = h.pick([100, 120, 150]); const p = h.pick([20, 30]);
    const gasto = (saldo * p) / 100; const correct = saldo - gasto;
    return { subtipo: 'contexto',
      pt: 'A Rita tinha ' + saldo + ' EUR e gastou ' + p + ' %. Com quanto ficou?',
      en: 'Rita had ' + saldo + ' EUR and spent ' + p + ' %. How much is left?',
      ep: 'Gastou ' + gasto + ', ficou com ' + correct + ' EUR.',
      ee: 'She spent ' + gasto + ', she kept ' + correct + ' EUR.',
      correct, wrongs: [gasto, saldo], near: correct + 5 };
  }
];
