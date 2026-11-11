import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('scripts/templates', { recursive: true });

const w = (name, content) => writeFileSync('scripts/templates/' + name + '.mjs', content);

w('num-nat', `export default [
  (h, d) => {
    let n = 0; let digit = 0;
    do { n = h.int(d === 1 ? 1000 : 10000, d === 3 ? 999999 : 99999); digit = h.pick([2,3,4,5,6,7,8,9]); }
    while (!String(n).includes(String(digit)));
    const place = 10 ** (String(n).length - 1 - String(n).indexOf(String(digit)));
    const correct = place * digit;
    return { subtipo: 'valor-posicional',
      pt: 'No numero ' + n + ', qual e o valor do algarismo ' + digit + '?',
      en: 'In the number ' + n + ', what is the value of the digit ' + digit + '?',
      ep: 'O ' + digit + ' vale ' + correct + ' porque esta nessa ordem.',
      ee: 'The ' + digit + ' is worth ' + correct + ' because of its place.',
      correct, wrongs: [digit, correct * 10], near: correct + place };
  },
  (h, d) => {
    const base = h.int(d === 1 ? 120 : 1200, d === 3 ? 9800 : 980);
    const unit = h.pick([10, 100]);
    const correct = Math.round(base / unit) * unit;
    return { subtipo: 'arredondamento',
      pt: 'Arredonda ' + base + ' as ' + (unit === 10 ? 'dezenas' : 'centenas') + '.',
      en: 'Round ' + base + ' to the nearest ' + (unit === 10 ? 'ten' : 'hundred') + '.',
      ep: 'O resultado e ' + correct + '.',
      ee: 'The result is ' + correct + '.',
      correct, wrongs: [base, correct - unit], near: correct + unit };
  },
  (h) => {
    const divisor = h.pick([2, 3, 5]);
    const correct = h.int(11, 90) * divisor;
    return { subtipo: 'divisibilidade',
      pt: 'Qual destes numeros e divisivel por ' + divisor + '?',
      en: 'Which of these numbers is divisible by ' + divisor + '?',
      ep: correct + ' / ' + divisor + ' = ' + correct / divisor + ', sem resto.',
      ee: correct + ' / ' + divisor + ' = ' + correct / divisor + ', no remainder.',
      correct, wrongs: [correct + 1, correct + 2], near: correct + divisor };
  }
];
`);

w('num-int', `export default [
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
`);

w('fra-add', `export default [
  (h) => {
    const den = h.pick([4, 5, 6, 8, 10]);
    const a = h.int(1, den - 2);
    const b = h.int(1, den - a);
    const correct = (a + b) + '/' + den;
    return { subtipo: 'adicao',
      pt: 'Quanto e ' + a + '/' + den + ' + ' + b + '/' + den + '?',
      en: 'What is ' + a + '/' + den + ' + ' + b + '/' + den + '?',
      ep: 'Somam-se os numeradores: ' + correct + '.',
      ee: 'Add the numerators: ' + correct + '.',
      correct, wrongs: [(a + b) + '/' + (den * 2), (a * b) + '/' + den], near: (a + b + 1) + '/' + den };
  },
  (h) => {
    const small = h.pick([2, 3, 4]);
    const big = small * h.pick([2, 3]);
    const a = h.int(1, small - 1);
    const b = h.int(1, big - 1);
    const correct = (a * (big / small) + b) + '/' + big;
    return { subtipo: 'adicao',
      pt: 'Quanto e ' + a + '/' + small + ' + ' + b + '/' + big + '?',
      en: 'What is ' + a + '/' + small + ' + ' + b + '/' + big + '?',
      ep: 'Reduz ao mesmo denominador: ' + correct + '.',
      ee: 'Use a common denominator: ' + correct + '.',
      correct, wrongs: [(a + b) + '/' + (small + big), (a + b) + '/' + big], near: (a * (big / small) + b + 1) + '/' + big };
  },
  (h) => {
    const den = h.pick([4, 6, 8, 10]);
    const a = h.int(1, den - 2);
    const b = h.int(1, den - a);
    const correct = (a + b) + '/' + den;
    return { subtipo: 'contexto',
      pt: 'O Tomas comeu ' + a + '/' + den + ' de um bolo e a irma ' + b + '/' + den + '. Que fracao comeram juntos?',
      en: 'Tom ate ' + a + '/' + den + ' of a cake and his sister ' + b + '/' + den + '. What fraction together?',
      ep: a + '/' + den + ' + ' + b + '/' + den + ' = ' + correct + '.',
      ee: a + '/' + den + ' + ' + b + '/' + den + ' = ' + correct + '.',
      correct, wrongs: [(a + b) + '/' + (den * 2), (a * b) + '/' + den], near: (a + b + 1) + '/' + den,
      visual: { tipo: 'pizza', fatias: den, comidas: a + b } };
  }
];
`);

w('fra-comp', `export default [
  (h) => {
    const den = h.pick([4, 5, 6, 8]);
    const n = h.int(1, den - 1);
    const bigger = h.pick([2, 3]);
    const correct = n + '/' + den;
    return { subtipo: 'comparacao',
      pt: 'Qual e maior: ' + n + '/' + den + ' ou ' + n + '/' + (den * bigger) + '?',
      en: 'Which is bigger: ' + n + '/' + den + ' or ' + n + '/' + (den * bigger) + '?',
      ep: 'Mesmo numerador, menor denominador e maior: ' + correct + '.',
      ee: 'Same numerator, smaller denominator is bigger: ' + correct + '.',
      correct, wrongs: [n + '/' + (den * bigger), n + '/' + (den * bigger + 1)], near: (n + 1) + '/' + den,
      visual: { tipo: 'fracaoComparada', a: { n, d: den }, b: { n, d: den * bigger } } };
  },
  (h) => {
    const den = h.pick([5, 7, 9]);
    const a = h.int(1, den - 2);
    const b = h.int(a + 1, den - 1);
    const correct = b + '/' + den;
    return { subtipo: 'comparacao',
      pt: 'Qual e maior: ' + a + '/' + den + ' ou ' + b + '/' + den + '?',
      en: 'Which is bigger: ' + a + '/' + den + ' or ' + b + '/' + den + '?',
      ep: 'Mesmo denominador, maior numerador: ' + correct + '.',
      ee: 'Same denominator, bigger numerator: ' + correct + '.',
      correct, wrongs: [a + '/' + den, a + '/' + (den + 1)], near: (b + 1) + '/' + den };
  },
  (h) => {
    const den = h.pick([6, 8, 10]);
    const correct = (den - 1) + '/' + den;
    return { subtipo: 'comparacao',
      pt: 'Qual esta mais perto de 1: ' + correct + ' ou 1/2?',
      en: 'Which is closer to 1: ' + correct + ' or 1/2?',
      ep: correct + ' so precisa de 1/' + den + ' para chegar a 1.',
      ee: correct + ' needs only 1/' + den + ' to reach 1.',
      correct, wrongs: ['1/2', (den - 2) + '/' + den], near: (den - 1) + '/' + (den + 1) };
  }
];
`);

w('fra-mult', `export default [
  (h) => {
    const a = h.int(1, 4); const b = h.int(2, 6); const c = h.int(1, 4); const d = h.int(2, 6);
    const correct = (a * c) + '/' + (b * d);
    return { subtipo: 'multiplicacao',
      pt: 'Quanto e ' + a + '/' + b + ' x ' + c + '/' + d + '?',
      en: 'What is ' + a + '/' + b + ' x ' + c + '/' + d + '?',
      ep: 'Numeradores e denominadores entre si: ' + correct + '.',
      ee: 'Numerators and denominators together: ' + correct + '.',
      correct, wrongs: [(a + c) + '/' + (b + d), (a * d) + '/' + (b * c)], near: (a * c + 1) + '/' + (b * d) };
  },
  (h) => {
    const den = h.pick([4, 5, 8, 10]);
    const n = h.int(1, den - 1);
    const total = den * h.int(2, 5);
    const correct = (total / den) * n;
    return { subtipo: 'fracao-de-quantidade',
      pt: 'Quanto e ' + n + '/' + den + ' de ' + total + '?',
      en: 'What is ' + n + '/' + den + ' of ' + total + '?',
      ep: total + ' / ' + den + ' x ' + n + ' = ' + correct + '.',
      ee: total + ' / ' + den + ' x ' + n + ' = ' + correct + '.',
      correct, wrongs: [total / den, total - correct], near: correct + 1 };
  },
  (h) => {
    const den = h.pick([4, 5, 8]);
    const n = h.int(1, den - 1);
    const preco = den * h.int(2, 6);
    const correct = (preco / den) * n;
    return { subtipo: 'contexto',
      pt: 'Um casaco custa ' + preco + ' EUR com ' + n + '/' + den + ' de desconto. Quanto poupas?',
      en: 'A coat costs ' + preco + ' EUR with ' + n + '/' + den + ' off. How much do you save?',
      ep: n + '/' + den + ' de ' + preco + ' = ' + correct + ' EUR.',
      ee: n + '/' + den + ' of ' + preco + ' = ' + correct + ' EUR.',
      correct, wrongs: [preco / den, preco - correct], near: correct + 1 };
  }
];
`);

w('equ-res', `export default [
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
`);

w('geo-are', `export default [
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
`);

w('pot-cal', `export default [
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
`);

w('per-cal', `export default [
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
`);

w('pro-dir', `export default [
  (h) => {
    const unit = h.int(2, 6); const n = h.int(2, 5); const m = n + h.int(1, 4);
    const correct = unit * m;
    return { subtipo: 'direta',
      pt: 'Se ' + n + ' cadernos custam ' + (unit * n) + ' EUR, quanto custam ' + m + '?',
      en: 'If ' + n + ' notebooks cost ' + (unit * n) + ' EUR, how much do ' + m + ' cost?',
      ep: 'Um custa ' + unit + ' EUR, ' + m + ' custam ' + correct + ' EUR.',
      ee: 'One costs ' + unit + ' EUR, ' + m + ' cost ' + correct + ' EUR.',
      correct, wrongs: [unit * n, unit * n + unit], near: correct + unit };
  },
  (h) => {
    const pessoas = h.int(2, 4); const gramas = pessoas * h.int(40, 80); const alvo = pessoas * 2;
    const correct = (gramas / pessoas) * alvo;
    return { subtipo: 'receita',
      pt: 'Uma receita para ' + pessoas + ' leva ' + gramas + ' g. Quantos g para ' + alvo + '?',
      en: 'A recipe for ' + pessoas + ' uses ' + gramas + ' g. How many g for ' + alvo + '?',
      ep: 'Por pessoa ' + (gramas / pessoas) + ' g, para ' + alvo + ' sao ' + correct + ' g.',
      ee: 'Per person ' + (gramas / pessoas) + ' g, for ' + alvo + ' it is ' + correct + ' g.',
      correct, wrongs: [gramas, gramas * 2], near: correct + 10 };
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
`);

w('est-med', `const exato = (h, k, min, max) => {
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
`);

w('prob-cal', `export default [
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
`);

w('log-pro', `export default [
  (h) => {
    const pos = h.int(2, 9); const gap = h.int(2, 6);
    const correct = gap - 1;
    return { subtipo: 'ordem',
      pt: 'Numa fila, a Ana e a ' + pos + '.a e o Rui o ' + (pos + gap) + '.o. Quantos estao entre eles?',
      en: 'In a queue Ana is ' + pos + 'th and Rui ' + (pos + gap) + 'th. How many are between?',
      ep: 'Entre eles estao ' + correct + ' pessoas.',
      ee: 'Between them are ' + correct + ' people.',
      correct, wrongs: [gap, gap + 1], near: correct + 1 };
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
`);

w('dec-ope', `export default [
  (h) => {
    const a = h.int(10, 90) / 10; const b = h.int(10, 90) / 10;
    const correct = Math.round((a + b) * 10) / 10;
    return { subtipo: 'adicao',
      pt: 'Quanto e ' + h.pt(a) + ' + ' + h.pt(b) + '?',
      en: 'What is ' + a + ' + ' + b + '?',
      ep: h.pt(a) + ' + ' + h.pt(b) + ' = ' + h.pt(correct) + '.',
      ee: a + ' + ' + b + ' = ' + correct + '.',
      correct: h.pt(correct), wrongs: [h.pt(Math.abs(a - b)), h.pt(correct + 1)], near: h.pt(correct + 2) };
  },
  (h) => {
    const a = h.int(30, 90) / 10; const b = h.int(10, 29) / 10;
    const correct = Math.round((a - b) * 10) / 10;
    return { subtipo: 'subtracao',
      pt: 'Quanto e ' + h.pt(a) + ' - ' + h.pt(b) + '?',
      en: 'What is ' + a + ' - ' + b + '?',
      ep: h.pt(a) + ' - ' + h.pt(b) + ' = ' + h.pt(correct) + '.',
      ee: a + ' - ' + b + ' = ' + correct + '.',
      correct: h.pt(correct), wrongs: [h.pt(b), h.pt(a + b)], near: h.pt(correct + 1) };
  },
  (h) => {
    const a = h.int(2, 9) / 10; const b = h.int(2, 9);
    const correct = Math.round(a * b * 10) / 10;
    return { subtipo: 'multiplicacao',
      pt: 'Quanto e ' + h.pt(a) + ' x ' + b + '?',
      en: 'What is ' + a + ' x ' + b + '?',
      ep: h.pt(a) + ' x ' + b + ' = ' + h.pt(correct) + '.',
      ee: a + ' x ' + b + ' = ' + correct + '.',
      correct: h.pt(correct), wrongs: [h.pt(a + b), h.pt(Math.round(a * b * 100) / 100)], near: h.pt(correct + 1) };
  }
];
`);

console.log('Bloco 3 concluido: 42 templates criados.');