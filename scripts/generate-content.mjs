import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as h from './lib.mjs';

const ROOT = 'src/content/mundos';
const PER_TEMPLATE = 8;
const DIFICULDADES = [1, 1, 2, 2, 2, 3, 3, 3];
const TENTATIVAS = 80;

const GRUPOS = [
  ['num-nat', 'numeros', 'mundo-1'],
  ['num-int', 'inteiros', 'mundo-1'],
  ['fra-add', 'fracoes', 'mundo-2'],
  ['fra-comp', 'fracoes', 'mundo-2'],
  ['fra-mult', 'fracoes', 'mundo-2'],
  ['equ-res', 'equacoes', 'mundo-2'],
  ['geo-are', 'geometria', 'mundo-3'],
  ['pot-cal', 'potencias', 'mundo-3'],
  ['per-cal', 'percentagens', 'mundo-4'],
  ['pro-dir', 'proporcionalidade', 'mundo-4'],
  ['est-med', 'estatistica', 'mundo-5'],
  ['prob-cal', 'probabilidades', 'mundo-5'],
  ['log-pro', 'logica', 'mundo-6'],
  ['dec-ope', 'decimais', 'mundo-6']
];

export async function carregarTemplates() {
  const map = new Map();
  for (const [prefixo] of GRUPOS) {
    const modulo = await import('./templates/' + prefixo + '.mjs');
    map.set(prefixo, modulo.default);
  }
  return map;
}

function tentar(prefixo, template, dificuldade, indice) {
  const base = template(h, dificuldade);
  h.assert(base.pt && base.en, prefixo + ': enunciado vazio');
  h.assert(base.ep && base.ee, prefixo + ': explicacao vazia');
  h.assert(Array.isArray(base.wrongs) && base.wrongs.length === 2, prefixo + ': precisa de 2 distratores');
  h.assert(base.near !== undefined, prefixo + ': falta distrator adjacente');
  for (const wrong of base.wrongs) h.assert(String(wrong) !== String(base.correct), prefixo + ': distrator igual a resposta');
  h.assert(String(base.near) !== String(base.correct), prefixo + ': adjacente igual a resposta');

  const { opcoes, resposta } = h.build(base.correct, base.wrongs, base.near);

  return {
    id: prefixo + '-' + String(indice).padStart(4, '0'),
    subtipo: base.subtipo,
    dificuldade,
    pergunta: { 'pt-PT': base.pt, en: base.en },
    ...(base.visual ? { visual: base.visual } : {}),
    opcoes,
    resposta,
    explicacao: { 'pt-PT': base.ep, en: base.ee },
    tempoSugerido: 20 + dificuldade * 15,
    tags: [prefixo, 'gerado']
  };
}

export function gerarExercicio(prefixo, template, dificuldade, indice) {
  let ultimo = null;
  for (let i = 0; i < TENTATIVAS; i += 1) {
    try {
      return tentar(prefixo, template, dificuldade, indice);
    } catch (erro) {
      ultimo = erro;
    }
  }
  throw new Error(prefixo + ' falhou apos ' + TENTATIVAS + ' tentativas: ' + (ultimo ? ultimo.message : '?'));
}

function escreverNiveis(mundo, index) {
  const dir = join(ROOT, mundo);
  for (let nivel = 1; nivel <= 5; nivel += 1) {
    const ids = index.slice((nivel - 1) * 5, nivel * 5);
    h.assert(ids.length === 5, mundo + ': nivel ' + nivel + ' sem ids');
    writeFileSync(join(dir, 'nivel-' + nivel + '.json'), JSON.stringify({
      id: mundo + '-nivel-' + nivel,
      worldId: mundo,
      titulo: { 'pt-PT': 'Nivel ' + nivel, en: 'Level ' + nivel },
      boss: false,
      tempoSugerido: 150 + nivel * 15,
      questionIds: ids
    }, null, 2) + '\n');
  }
  const boss = index.slice(-8);
  h.assert(boss.length === 8, mundo + ': boss sem ids');
  writeFileSync(join(dir, 'nivel-6.json'), JSON.stringify({
    id: mundo + '-nivel-6',
    worldId: mundo,
    titulo: { 'pt-PT': 'Boss', en: 'Boss' },
    boss: true,
    tempoSugerido: 160,
    questionIds: boss
  }, null, 2) + '\n');
}

export async function gerarTudo() {
  h.setSeed(20261110);
  const templates = await carregarTemplates();
  let total = 0;

  for (const [prefixo, topico, mundo] of GRUPOS) {
    const dir = join(ROOT, mundo, 'questoes');
    mkdirSync(dir, { recursive: true });
    const lista = templates.get(prefixo);
    h.assert(lista && lista.length === 3, prefixo + ': precisa de 3 templates');

    let indice = 0;
    for (const template of lista) {
      for (let i = 0; i < PER_TEMPLATE; i += 1) {
        indice += 1;
        const exercicio = gerarExercicio(prefixo, template, DIFICULDADES[i], indice);
        writeFileSync(join(dir, exercicio.id + '.json'), JSON.stringify({
          ...exercicio,
          worldId: mundo,
          topico,
          curriculo: ['PT_6ano_MAT_' + topico.toUpperCase()]
        }, null, 2) + '\n');
        total += 1;
      }
    }
  }

  for (const mundo of ['mundo-1','mundo-2','mundo-3','mundo-4','mundo-5','mundo-6']) {
    const prefixos = GRUPOS.filter(([, , m]) => m === mundo).map(([p]) => p);
    const ids = prefixos.flatMap((prefixo) =>
      Array.from({ length: PER_TEMPLATE * 3 }, (_, i) => prefixo + '-' + String(i + 1).padStart(4, '0'))
    );
    const ordenado = ids.slice().sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
    writeFileSync(join(ROOT, mundo, 'index.json'), JSON.stringify(ordenado, null, 2) + '\n');
    escreverNiveis(mundo, ordenado);
  }

  return total;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  gerarTudo().then((total) => console.log('Gerados ' + total + ' exercicios.'));
}
