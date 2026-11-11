export default [
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
