import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

const PT = {
  common: { back: 'Voltar' },
  app: { title: 'Coruja Matematica', subtitle: 'Treina matematica do 6.o ano com a Professora Coruja.' },
  world: { title: 'Escolhe um mundo', progress: '{{done}} de {{total}} estrelas' },
  level: { play: 'Jogar', train: 'Treinar', stars: '{{count}} de 3 estrelas', bossSoon: 'Boss: em breve' },
  game: { progress: 'Pergunta {{current}} de {{total}}', exit: 'Sair', correct: 'Boa! Acertaste.', wrong: 'Quase. Ve a explicacao.', next: 'Proxima', finish: 'Terminar', explanation: 'Explicacao', options: 'Opcoes', training: 'Treino', left: 'Esquerda', right: 'Direita', jump: 'Saltar', arena: 'Arena de jogo.' },
  complete: { title: 'Nivel completo', score: 'Acertaste {{correct}} de {{total}}.', coins: 'Ganhaste {{count}} penas.', trainingNote: 'Modo treino: as estrelas nao contam.', repeat: 'Repetir', next: 'Proximo nivel', map: 'Voltar ao mapa' },
  settings: { open: 'Definicoes', title: 'Definicoes', sound: 'Som', music: 'Musica', timed: 'Sem tempo', buttonsOnly: 'So botoes', highContrast: 'Alto contraste', dyslexia: 'Fonte dislexia', readOnlyMode: 'Somente leitura', textSize: 'Tamanho do texto', sizeNormal: 'Normal', sizeLarge: 'Grande', sizeHuge: 'Muito grande' },
  profile: { title: 'Perfil', coins: '{{count}} penas', streak: '{{count}} dias', stars: '{{count}} estrelas' },
  shop: { open: 'Loja', title: 'Loja', buy: 'Comprar', equip: 'Equipar', own: 'Teu', equipped: 'Equipado', tab: { hat: 'Chapeus', colour: 'Cores' } },
  daily: { open: 'Desafio do dia' },
  parents: { title: 'Zona de pais', gate: 'Quanto e {{a}} x {{b}}?', gateError: 'Errado. Tenta de novo.', enter: 'Entrar', report: 'Relatorio', level: 'Nivel', stars: 'Estrelas', empty: 'Sem niveis concluidos.', analytics: 'Estatisticas anonimas' },
  credits: { title: 'Creditos', team: 'Equipa', teamText: 'Projeto educativo independente.', tech: 'Tecnologias', techText: 'Phaser, TypeScript, Vite, i18next, Zod.', privacy: 'Privacidade', privacyText: 'Sem anuncios nem dados pessoais.' }
};

const EN = {
  common: { back: 'Back' },
  app: { title: 'Owl Maths', subtitle: 'Practise grade 6 maths with Professor Owl.' },
  world: { title: 'Pick a world', progress: '{{done}} of {{total}} stars' },
  level: { play: 'Play', train: 'Train', stars: '{{count}} of 3 stars', bossSoon: 'Boss: soon' },
  game: { progress: 'Question {{current}} of {{total}}', exit: 'Leave', correct: 'Nice!', wrong: 'Almost. Read the explanation.', next: 'Next', finish: 'Finish', explanation: 'Explanation', options: 'Options', training: 'Training', left: 'Left', right: 'Right', jump: 'Jump', arena: 'Game arena.' },
  complete: { title: 'Level complete', score: 'You got {{correct}} of {{total}}.', coins: 'You earned {{count}} feathers.', trainingNote: 'Training: stars do not count.', repeat: 'Repeat', next: 'Next level', map: 'Back to map' },
  settings: { open: 'Settings', title: 'Settings', sound: 'Sound', music: 'Music', timed: 'No timer', buttonsOnly: 'Buttons only', highContrast: 'High contrast', dyslexia: 'Dyslexia font', readOnlyMode: 'Read only', textSize: 'Text size', sizeNormal: 'Normal', sizeLarge: 'Large', sizeHuge: 'Huge' },
  profile: { title: 'Profile', coins: '{{count}} feathers', streak: '{{count}} days', stars: '{{count}} stars' },
  shop: { open: 'Shop', title: 'Shop', buy: 'Buy', equip: 'Equip', own: 'Owned', equipped: 'Equipped', tab: { hat: 'Hats', colour: 'Colours' } },
  daily: { open: 'Daily challenge' },
  parents: { title: 'Parent zone', gate: 'What is {{a}} x {{b}}?', gateError: 'Wrong. Try again.', enter: 'Enter', report: 'Progress report', level: 'Level', stars: 'Stars', empty: 'No levels yet.', analytics: 'Anonymous analytics' },
  credits: { title: 'Credits', team: 'Team', teamText: 'Independent educational project.', tech: 'Tech', techText: 'Phaser, TypeScript, Vite, i18next, Zod.', privacy: 'Privacy', privacyText: 'No ads, no personal data.' }
};

const clone = (o) => JSON.parse(JSON.stringify(o));

w('src/locales/pt-PT.json', JSON.stringify(PT, null, 2) + '\n');
w('src/locales/en.json', JSON.stringify(EN, null, 2) + '\n');

const BR = clone(PT);
BR.level.bossSoon = 'Chefe: em breve';
BR.game.correct = 'Boa! Voce acertou.';
BR.game.jump = 'Pular';
BR.settings.buttonsOnly = 'Somente botoes';
w('src/locales/pt-BR.json', JSON.stringify(BR, null, 2) + '\n');

const ES = clone(EN);
ES.common.back = 'Volver';
ES.app.title = 'Buho Matematico';
ES.app.subtitle = 'Practica matematicas de 6.o con la Profesora Buho.';
ES.world.title = 'Elige un mundo';
ES.world.progress = '{{done}} de {{total}} estrellas';
ES.level.play = 'Jugar';
ES.level.train = 'Entrenar';
ES.level.bossSoon = 'Jefe: pronto';
ES.game.correct = 'Bien!';
ES.game.wrong = 'Casi. Lee la explicacion.';
ES.game.next = 'Siguiente';
ES.game.finish = 'Terminar';
ES.game.jump = 'Saltar';
ES.game.left = 'Izquierda';
ES.game.right = 'Derecha';
ES.settings.title = 'Ajustes';
ES.settings.sound = 'Sonido';
ES.settings.music = 'Musica';
ES.settings.timed = 'Sin tiempo';
ES.settings.buttonsOnly = 'Solo botones';
ES.settings.highContrast = 'Alto contraste';
ES.profile.title = 'Perfil';
ES.profile.coins = '{{count}} plumas';
ES.profile.streak = '{{count}} dias';
ES.profile.stars = '{{count}} estrellas';
ES.shop.title = 'Tienda';
ES.shop.buy = 'Comprar';
ES.shop.equip = 'Equipar';
ES.shop.own = 'Tuyo';
ES.shop.equipped = 'Equipado';
ES.shop.tab.hat = 'Sombreros';
ES.shop.tab.colour = 'Colores';
ES.daily.open = 'Reto del dia';
ES.parents.title = 'Zona de padres';
ES.parents.enter = 'Entrar';
ES.parents.report = 'Informe';
ES.parents.level = 'Nivel';
ES.parents.stars = 'Estrellas';
ES.parents.empty = 'Sin niveles.';
ES.credits.title = 'Creditos';
w('src/locales/es.json', JSON.stringify(ES, null, 2) + '\n');

w('src/content/mundos/mundo-1/manifest.json', JSON.stringify({ id: 'mundo-1', ordem: 1, nome: { 'pt-PT': 'Vale dos Numeros', en: 'Number Valley' }, descricao: { 'pt-PT': 'Valor posicional e inteiros.', en: 'Place value and integers.' }, tema: 'numeros', cor: '#2c8fe0', corSuave: '#e7f2fc', icone: 'numeros', topicos: ['numeros', 'inteiros'] }, null, 2) + '\n');
w('src/content/mundos/mundo-2/manifest.json', JSON.stringify({ id: 'mundo-2', ordem: 2, nome: { 'pt-PT': 'Cozinha das Fracoes', en: 'Fraction Kitchen' }, descricao: { 'pt-PT': 'Fracoes e equacoes.', en: 'Fractions and equations.' }, tema: 'fracoes', cor: '#ff9e33', corSuave: '#fff1df', icone: 'fracoes', topicos: ['fracoes', 'equacoes'] }, null, 2) + '\n');
w('src/content/mundos/mundo-3/manifest.json', JSON.stringify({ id: 'mundo-3', ordem: 3, nome: { 'pt-PT': 'Oficina da Geometria', en: 'Geometry Workshop' }, descricao: { 'pt-PT': 'Areas e potencias.', en: 'Areas and powers.' }, tema: 'geometria', cor: '#c2458f', corSuave: '#fbe9f3', icone: 'geometria', topicos: ['geometria', 'potencias'] }, null, 2) + '\n');
w('src/content/mundos/mundo-4/manifest.json', JSON.stringify({ id: 'mundo-4', ordem: 4, nome: { 'pt-PT': 'Mercado das Percentagens', en: 'Percentage Market' }, descricao: { 'pt-PT': 'Percentagens e proporcoes.', en: 'Percentages and proportions.' }, tema: 'percentagens', cor: '#1fa97a', corSuave: '#e3f7ee', icone: 'percentagens', topicos: ['percentagens', 'proporcionalidade'] }, null, 2) + '\n');
w('src/content/mundos/mundo-5/manifest.json', JSON.stringify({ id: 'mundo-5', ordem: 5, nome: { 'pt-PT': 'Observatorio de Dados', en: 'Data Observatory' }, descricao: { 'pt-PT': 'Media e probabilidades.', en: 'Means and probability.' }, tema: 'estatistica', cor: '#0e9aa7', corSuave: '#e2f6f8', icone: 'estatistica', topicos: ['estatistica', 'probabilidades'] }, null, 2) + '\n');
w('src/content/mundos/mundo-6/manifest.json', JSON.stringify({ id: 'mundo-6', ordem: 6, nome: { 'pt-PT': 'Gabinete da Logica', en: 'Logic Office' }, descricao: { 'pt-PT': 'Logica e decimais.', en: 'Logic and decimals.' }, tema: 'logica', cor: '#7b4be0', corSuave: '#efe7ff', icone: 'logica', topicos: ['logica', 'decimais'] }, null, 2) + '\n');

w('tests/save.test.ts', `// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { addCoins, load, recordLevelResult } from '../src/services/save';

beforeEach(() => window.localStorage.clear());

describe('save', () => {
  it('persiste moedas', () => {
    addCoins(15);
    expect(load().coins).toBe(15);
  });
  it('guarda a melhor pontuacao', () => {
    recordLevelResult('mundo-1-nivel-1', 1);
    recordLevelResult('mundo-1-nivel-1', 3);
    recordLevelResult('mundo-1-nivel-1', 2);
    expect(load().stars['mundo-1-nivel-1']).toBe(3);
  });
  it('recupera default com JSON corrompido', () => {
    window.localStorage.setItem('coruja.save.v3', '{oops');
    expect(load().coins).toBe(0);
  });
});
`);

w('tests/smoke.test.ts', `import { describe, expect, it } from 'vitest';
import { questionSchema } from '../src/content/schema';
import { loadAllWorldIds, loadLevelQuestions, loadLevels } from '../src/content/worlds';

const worlds = loadAllWorldIds();

describe('fumo', () => {
  it('6 mundos, 36 niveis', async () => {
    let total = 0;
    for (const world of worlds) total += (await loadLevels(world)).length;
    expect(total).toBe(36);
  });

  it('todas as perguntas validas', async () => {
    for (const world of worlds) {
      for (const level of await loadLevels(world)) {
        const questions = await loadLevelQuestions(world, level.id);
        expect(questions).toHaveLength(level.boss ? 8 : 5);
        for (const q of questions) {
          expect(questionSchema.safeParse(q).success).toBe(true);
          expect(new Set(q.opcoes).size).toBe(4);
          expect(q.resposta).toBeLessThan(q.opcoes.length);
        }
      }
    }
  });
});
`);

w('tests/validate.test.ts', `import { describe, expect, it } from 'vitest';
import { runValidation } from '../scripts/validate-content';

describe('validate:content', () => {
  it('sem problemas', () => {
    expect(runValidation()).toEqual([]);
  });
});
`);

w('tests/locales.test.ts', `import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const flat = (o: Record<string, unknown>, p = ''): string[] =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v as Record<string, unknown>, p + k + '.') : [p + k]));

const base = new Set(flat(JSON.parse(readFileSync('src/locales/pt-PT.json', 'utf8')) as Record<string, unknown>));

describe('locales', () => {
  it.each(['pt-BR', 'en', 'es'])('%s tem as mesmas chaves', (locale) => {
    const keys = new Set(flat(JSON.parse(readFileSync('src/locales/' + locale + '.json', 'utf8')) as Record<string, unknown>));
    expect([...base].filter((k) => !keys.has(k))).toEqual([]);
  });
});
`);

w('tests/generator.test.ts', `import { describe, expect, it } from 'vitest';
import * as h from '../scripts/lib.mjs';
import { carregarTemplates, gerarExercicio } from '../scripts/generate-content.mjs';

describe('gerador', () => {
  it('todas as opcoes sao unicas', async () => {
    h.setSeed(5);
    const templates = await carregarTemplates();
    for (const [prefixo, lista] of templates) {
      for (const template of lista) {
        const item = gerarExercicio(prefixo, template, 2, 1);
        expect(new Set(item.opcoes).size).toBe(4);
        expect(item.opcoes[item.resposta]).toBeDefined();
      }
    }
  });

  it('num-nat nunca gera digito ausente', async () => {
    h.setSeed(7);
    const templates = await carregarTemplates();
    for (let i = 0; i < 30; i += 1) {
      const item = gerarExercicio('num-nat', templates.get('num-nat')[0], 2, 1);
      const numero = item.pergunta['pt-PT'].match(/numero (\\d+)/)?.[1] ?? '';
      const digito = item.pergunta['pt-PT'].match(/algarismo (\\d)/)?.[1] ?? '';
      expect(numero).toContain(digito);
    }
  });
});
`);

console.log('Bloco 6 concluido: locales, manifests e testes criados.');
