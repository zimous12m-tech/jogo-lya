// CONTEÚDO CONCATENADO GERADO AUTOMATICAMENTE

// ==========================================
// ARQUIVO: bloco1.mjs
// ==========================================
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};

mkdirSync('gerar', { recursive: true });

w('package.json', `{
  "name": "coruja-matematica",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "lint": "eslint .",
    "format": "prettier --write .",
    "content:build": "node scripts/generate-content.mjs",
    "validate:content": "tsx scripts/validate-content.ts",
    "setup": "node scripts/generate-content.mjs && npm run validate:content"
  },
  "dependencies": {
    "@capacitor/core": "^6.2.0",
    "i18next": "^23.15.1",
    "phaser": "^3.87.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@capacitor/android": "^6.2.0",
    "@capacitor/cli": "^6.2.0",
    "@eslint/js": "^9.14.0",
    "@types/node": "^22.9.0",
    "eslint": "^9.14.0",
    "eslint-config-prettier": "^9.1.0",
    "jsdom": "^25.0.1",
    "prettier": "^3.3.3",
    "tsx": "^4.19.2",
    "typescript": "^5.6.3",
    "typescript-eslint": "^8.13.0",
    "vite": "^5.4.10",
    "vite-plugin-pwa": "^0.20.5",
    "vitest": "^2.1.4"
  }
}
`);

w('tsconfig.json', `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["node", "vite/client", "vite-plugin-pwa/client", "vitest/globals"]
  },
  "include": ["src", "tests", "scripts/validate-content.ts", "vite.config.ts", "vitest.config.ts"]
}
`);

w('vite.config.ts', `import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  build: { target: 'es2020' },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      manifest: {
        name: 'Coruja Matematica',
        short_name: 'Coruja',
        description: 'Treina matematica do 6.o ano com a Professora Coruja.',
        lang: 'pt-PT',
        theme_color: '#6c5ce7',
        background_color: '#fdfbf7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        icons: [
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icons/maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,json}'] }
    })
  ]
});
`);

w('vitest.config.ts', `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { globals: true, environment: 'node', include: ['tests/**/*.test.ts'] }
});
`);

w('eslint.config.js', `import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'legacy', 'android', 'ios'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      'max-lines': ['error', { max: 400, skipBlankLines: true, skipComments: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  }
);
`);

w('.editorconfig', `root = true
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
`);

w('.prettierrc.json', `{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
`);

w('.gitignore', `node_modules/
dist/
.env
*.keystore
.DS_Store
`);

w('.env.example', `VITE_ANALYTICS_ENABLED=false
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=
`);

w('index.html', `<!doctype html>
<html lang="pt-PT">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#6c5ce7" />
    <title>Coruja Matematica</title>
    <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`);

w('public/icons/icon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#6c5ce7"/>
  <ellipse cx="256" cy="300" rx="132" ry="150" fill="#8e7cf0" stroke="#241c2e" stroke-width="14"/>
  <circle cx="212" cy="212" r="58" fill="#fff" stroke="#241c2e" stroke-width="14"/>
  <circle cx="300" cy="212" r="58" fill="#fff" stroke="#241c2e" stroke-width="14"/>
  <circle cx="212" cy="216" r="24" fill="#241c2e"/>
  <circle cx="300" cy="216" r="24" fill="#241c2e"/>
  <path d="M256 258 L226 306 L286 306 Z" fill="#fdcb6e" stroke="#241c2e" stroke-width="12"/>
</svg>
`);

w('public/icons/maskable.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#6c5ce7"/>
  <ellipse cx="256" cy="300" rx="110" ry="126" fill="#8e7cf0" stroke="#241c2e" stroke-width="14"/>
  <circle cx="216" cy="226" r="48" fill="#fff" stroke="#241c2e" stroke-width="14"/>
  <circle cx="296" cy="226" r="48" fill="#fff" stroke="#241c2e" stroke-width="14"/>
  <circle cx="216" cy="230" r="20" fill="#241c2e"/>
  <circle cx="296" cy="230" r="20" fill="#241c2e"/>
</svg>
`);

w('public/privacidade.html', `<!doctype html>
<html lang="pt-PT">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Privacidade - Coruja Matematica</title>
    <style>body{font-family:system-ui,sans-serif;max-width:46rem;margin:0 auto;padding:1.5rem;line-height:1.6}a{color:#4834d4}</style>
  </head>
  <body>
    <h1>Politica de Privacidade</h1>
    <p>Ultima atualizacao: novembro de 2026.</p>
    <h2>Dados recolhidos</h2>
    <p>Nenhum dado pessoal identificavel. Sem contas, e-mail ou localizacao.</p>
    <h2>Progresso</h2>
    <p>Fica apenas no armazenamento local do dispositivo.</p>
    <h2>Analitica</h2>
    <p>Desligada por omissao. So envia eventos anonimos apos consentimento.</p>
    <h2>Anuncios</h2>
    <p>Sem anuncios e sem compras na versao web.</p>
    <h2>Contacto</h2>
    <p><a href="mailto:suporte@corujamatematica.pt">suporte@corujamatematica.pt</a></p>
    <p><a href="./">Voltar ao jogo</a></p>
  </body>
</html>
`);

w('capacitor.config.ts', `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pt.corujamatematica.app',
  appName: 'Coruja Matematica',
  webDir: 'dist'
};

export default config;
`);

w('.github/workflows/ci.yml', `name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run content:build
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
`);

w('.github/workflows/deploy.yml', `name: Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run content:build
      - run: npm run validate:content
      - run: npm run test
      - run: npm run build
      - run: cp -r legacy dist/legacy
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
`);

w('README.md', `# Coruja Matematica

Jogo educativo de matematica do 6.o ano, em portugues.

## Instalar
\`\`\`bash
npm install
npm run setup
npm run dev
\`\`\`

## Verificar
\`\`\`bash
npm run typecheck
npm run test
npm run build
\`\`\`

## Conteudo
Os exercicios sao gerados por \`scripts/generate-content.mjs\`. Nunca editar a mao.
`);

w('legacy/index.html', `<!doctype html>
<html lang="pt"><head><meta charset="UTF-8"><title>Laboratorio Magico - legado</title>
<style>body{font-family:sans-serif;background:#1e3c72;color:#fff;display:flex;justify-content:center;padding:40px}
.jogo{background:#fdfbf7;color:#2d3436;border-radius:20px;padding:24px;max-width:600px}
.opcao{display:block;width:100%;margin:8px 0;padding:12px;border-radius:10px;border:0;background:#6c5ce7;color:#fff;font-size:1em}</style></head>
<body><div class="jogo"><h1>Laboratorio Magico (legado)</h1><p>Prototipo original com 12 perguntas.</p>
<div id="p"></div><div id="o"></div><div id="e"></div></div>
<script>
var cenas=[
{p:"1/2 + 1/4 = ?",o:["2/6","3/4","2/4","1/6"],r:1,e:"1/2 = 2/4, logo 3/4."},
{p:"80 EUR com 25% de desconto?",o:["60","55","65","20"],r:0,e:"80-20=60."},
{p:"-3 C sobe 7 C?",o:["-10","4","-4","10"],r:1,e:"-3+7=4."},
{p:"3x+5=20, x=?",o:["3","5","7","15"],r:1,e:"3x=15, x=5."},
{p:"Area 8x5?",o:["13","26","40","80"],r:2,e:"8x5=40."},
{p:"4 bolos=12 ovos, 6 bolos=?",o:["14","16","18","24"],r:2,e:"1 bolo=3, 6x3=18."},
{p:"Media de 12,15,18,15?",o:["14","15","16","17"],r:1,e:"60/4=15."},
{p:"Qual e maior: 3/4 ou 5/8?",o:["3/4","5/8","iguais","?"],r:0,e:"3/4=6/8."},
{p:"2 elevado a 5?",o:["10","25","32","64"],r:2,e:"2x2x2x2x2=32."},
{p:"120 EUR menos 30%?",o:["36","84","90","100"],r:1,e:"120-36=84."},
{p:"Perimetro de quadrado de lado 7?",o:["14","21","28","49"],r:2,e:"4x7=28."},
{p:"x+2x=27, x=?",o:["7","9","13","18"],r:1,e:"3x=27, x=9."}];
var i=0;function r(){var c=cenas[i];document.getElementById("p").textContent=c.p;
var o=document.getElementById("o");o.innerHTML="";c.o.forEach(function(t,j){var b=document.createElement("button");
b.className="opcao";b.textContent=t;b.onclick=function(){document.getElementById("e").textContent=c.e;
setTimeout(function(){i++;if(i<cenas.length)r();else{document.getElementById("p").textContent="Fim!";o.innerHTML="";}},1200);};
o.appendChild(b);});}r();
</script></body></html>
`);

console.log('Bloco 1 concluido: estrutura e configuracao criadas.');

// ==========================================
// ARQUIVO: bloco2.mjs
// ==========================================
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};

w('src/content/schema.ts', `import { z } from 'zod';

export const TOPICOS = ['numeros','fracoes','decimais','percentagens','inteiros','potencias','proporcionalidade','equacoes','geometria','estatistica','probabilidades','logica'] as const;
export const WORLD_IDS = ['mundo-1','mundo-2','mundo-3','mundo-4','mundo-5','mundo-6'] as const;

export const worldIdSchema = z.enum(WORLD_IDS);

export const localizedTextSchema = z.object({
  'pt-PT': z.string().min(1),
  en: z.string().min(1),
  'pt-BR': z.string().min(1).optional(),
  es: z.string().min(1).optional()
});

const fractionSchema = z.object({ n: z.number().int().min(1), d: z.number().int().min(2) });

export const visualSchema = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('pizza'), fatias: z.number().int().min(2).max(12), comidas: z.number().int().min(1) }),
  z.object({ tipo: z.literal('fracaoComparada'), a: fractionSchema, b: fractionSchema }),
  z.object({ tipo: z.literal('desconto'), precoCentimos: z.number().int().positive(), percentagem: z.number().int().min(1).max(90) })
]);

export const questionSchema = z.object({
  id: z.string().regex(/^[a-z]+-[a-z]+-\\d{4}$/),
  worldId: worldIdSchema,
  topico: z.enum(TOPICOS),
  subtipo: z.string().min(1),
  dificuldade: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  curriculo: z.array(z.string().min(1)).min(1),
  pergunta: localizedTextSchema,
  visual: visualSchema.optional(),
  opcoes: z.array(z.string().min(1)).min(2).max(4),
  resposta: z.number().int().min(0),
  explicacao: localizedTextSchema,
  tempoSugerido: z.number().int().min(5).max(180),
  tags: z.array(z.string().min(1)).min(1)
}).superRefine((q, ctx) => {
  if (q.resposta >= q.opcoes.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['resposta'], message: 'resposta fora das opcoes' });
  if (new Set(q.opcoes).size !== q.opcoes.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['opcoes'], message: 'opcoes duplicadas' });
});

export const worldSchema = z.object({
  id: worldIdSchema,
  ordem: z.number().int().min(1).max(6),
  nome: localizedTextSchema,
  descricao: localizedTextSchema,
  tema: z.enum(['numeros','fracoes','geometria','percentagens','estatistica','logica']),
  cor: z.string().regex(/^#[0-9a-f]{6}$/),
  corSuave: z.string().regex(/^#[0-9a-f]{6}$/),
  icone: z.string().min(1),
  topicos: z.array(z.enum(TOPICOS)).min(1)
});

export const levelSchema = z.object({
  id: z.string().regex(/^mundo-[1-6]-nivel-[1-6]$/),
  worldId: worldIdSchema,
  titulo: localizedTextSchema,
  boss: z.boolean(),
  tempoSugerido: z.number().int().min(30).max(600),
  questionIds: z.array(z.string()).min(1).max(10)
});

export type Question = z.infer<typeof questionSchema>;
export type Visual = z.infer<typeof visualSchema>;
export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type World = z.infer<typeof worldSchema>;
export type Level = z.infer<typeof levelSchema>;
export type WorldId = z.infer<typeof worldIdSchema>;
`);

w('src/content/worlds.ts', `import { levelSchema, questionSchema, worldSchema } from './schema';
import type { Level, Question, World, WorldId } from './schema';

type Module = { default: unknown };
type Loader = () => Promise<Module>;

const manifests = import.meta.glob<Module>('./mundos/*/manifest.json');
const levels = import.meta.glob<Module>('./mundos/*/nivel-*.json');
const questions = import.meta.glob<Module>('./mundos/*/questoes/*.json');

const worldCache = new Map<string, World>();
const questionCache = new Map<string, Question>();

function parse<T>(schema: { safeParse: (v: unknown) => { success: true; data: T } | { success: false; error: { message: string } } }, raw: unknown, label: string): T {
  const result = schema.safeParse(raw);
  if (!result.success) throw new Error(label + ': ' + result.error.message);
  return result.data;
}

function loader(map: Record<string, Loader>, key: string): Loader {
  const found = map[key];
  if (!found) throw new Error('Ficheiro em falta: ' + key);
  return found;
}

export function loadAllWorldIds(): WorldId[] {
  return Object.keys(manifests)
    .map((key) => key.split('/')[2] ?? '')
    .filter((id): id is WorldId => id.length > 0)
    .sort();
}

export async function loadWorldManifest(worldId: WorldId): Promise<World> {
  const cached = worldCache.get(worldId);
  if (cached) return cached;
  const raw = await loader(manifests, './mundos/' + worldId + '/manifest.json')();
  const world = parse(worldSchema, raw.default, 'manifest ' + worldId);
  worldCache.set(worldId, world);
  return world;
}

export async function loadWorlds(): Promise<World[]> {
  return Promise.all(loadAllWorldIds().map((id) => loadWorldManifest(id)));
}

export async function loadLevels(worldId: WorldId): Promise<Level[]> {
  const prefix = './mundos/' + worldId + '/nivel-';
  const ids = Object.keys(levels).filter((key) => key.startsWith(prefix)).sort();
  return Promise.all(ids.map(async (key) => {
    const raw = await loader(levels, key)();
    return parse(levelSchema, raw.default, 'nivel ' + key);
  }));
}

async function loadQuestion(worldId: WorldId, questionId: string): Promise<Question> {
  const cacheKey = worldId + '/' + questionId;
  const cached = questionCache.get(cacheKey);
  if (cached) return cached;
  const raw = await loader(questions, './mundos/' + worldId + '/questoes/' + questionId + '.json')();
  const question = parse(questionSchema, raw.default, 'questao ' + questionId);
  if (question.worldId !== worldId) throw new Error(questionId + ' pertence a outro mundo');
  questionCache.set(cacheKey, question);
  return question;
}

export async function loadLevelQuestions(worldId: WorldId, levelId: string): Promise<Question[]> {
  const list = await loadLevels(worldId);
  const level = list.find((item) => item.id === levelId);
  if (!level) throw new Error('Nivel inexistente: ' + levelId);
  return Promise.all(level.questionIds.map((id) => loadQuestion(worldId, id)));
}

export async function loadWorldQuestions(worldId: WorldId): Promise<Question[]> {
  const prefix = './mundos/' + worldId + '/questoes/';
  const ids = Object.keys(questions)
    .filter((key) => key.startsWith(prefix))
    .map((key) => (key.split('/').pop() ?? '').replace('.json', ''));
  return Promise.all(ids.map((id) => loadQuestion(worldId, id)));
}
`);

w('scripts/lib.mjs', `let seed = 20261110;

export const setSeed = (value) => {
  seed = value;
};

export const rnd = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

export const int = (min, max) => min + Math.floor(rnd() * (max - min + 1));
export const pick = (list) => list[Math.floor(rnd() * list.length)];
export const pt = (value) => String(value).replace('.', ',');

export const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

export const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export function build(correct, wrongs, near) {
  const options = [String(correct), ...wrongs.map(String), String(near)];
  assert(options.length === 4, 'esperava 4 opcoes');
  assert(new Set(options).size === 4, 'opcoes colidem: ' + options.join(' | '));
  const shuffled = shuffle(options);
  return { opcoes: shuffled, resposta: shuffled.indexOf(String(correct)) };
}
`);

w('scripts/generate-content.mjs', `import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as h from './lib.mjs';

const ROOT = 'src/content/mundos';
const PER_TEMPLATE = 8;
const DIFICULDADES = [1, 1, 2, 2, 2, 3, 3, 3];

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

export function gerarExercicio(prefixo, template, dificuldade, indice) {
  const base = template(h, dificuldade);
  h.assert(base.pt && base.en, prefixo + ': enunciado vazio');
  h.assert(base.ep && base.ee, prefixo + ': explicacao vazia');
  h.assert(Array.isArray(base.wrongs) && base.wrongs.length === 2, prefixo + ': precisa de 2 distratores');
  h.assert(base.near !== undefined, prefixo + ': falta distrator adjacente');
  for (const wrong of base.wrongs) h.assert(String(wrong) !== String(base.correct), prefixo + ': distrator igual a resposta');
  h.assert(String(base.near) !== String(base.correct), prefixo + ': adjacente igual a resposta');

  const { opcoes, resposta } = h.build(base.correct, base.wrongs, base.near);
  const id = prefixo + '-' + String(indice).padStart(4, '0');

  return {
    id,
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
    }, null, 2) + '\\n');
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
  }, null, 2) + '\\n');
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
        }, null, 2) + '\\n');
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
    writeFileSync(join(ROOT, mundo, 'index.json'), JSON.stringify(ordenado, null, 2) + '\\n');
    escreverNiveis(mundo, ordenado);
  }

  return total;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  gerarTudo().then((total) => console.log('Gerados ' + total + ' exercicios.'));
}
`);

w('scripts/validate-content.ts', `import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { levelSchema, questionSchema } from '../src/content/schema';

const ROOT = 'src/content/mundos';

export function runValidation(): string[] {
  const problems: string[] = [];
  const worlds = readdirSync(ROOT).filter((n) => n.startsWith('mundo-'));
  if (worlds.length !== 6) problems.push('esperava 6 mundos, encontrei ' + worlds.length);

  for (const world of worlds) {
    const dir = join(ROOT, world);
    const files = readdirSync(dir).filter((n) => n.startsWith('nivel-'));
    const regulares = files.filter((n) => n !== 'nivel-6.json');
    if (regulares.length !== 5) problems.push(world + ': esperava 5 niveis');
    if (!files.includes('nivel-6.json')) problems.push(world + ': falta o boss');

    let index: string[] = [];
    try {
      index = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8')) as string[];
    } catch {
      problems.push(world + ': index.json ilegivel');
      continue;
    }
    const indexSet = new Set(index);

    for (const file of files) {
      const parsed = levelSchema.safeParse(JSON.parse(readFileSync(join(dir, file), 'utf8')));
      if (!parsed.success) { problems.push(world + '/' + file + ': schema invalido'); continue; }
      const level = parsed.data;
      const esperado = level.boss ? 8 : 5;
      if (level.questionIds.length !== esperado) problems.push(world + '/' + file + ': esperava ' + esperado);
      if (new Set(level.questionIds).size !== level.questionIds.length) problems.push(world + '/' + file + ': repetidos');
      for (const id of level.questionIds) {
        if (!indexSet.has(id)) problems.push(world + '/' + file + ': ' + id + ' fora do index');
        try {
          const q = questionSchema.safeParse(JSON.parse(readFileSync(join(dir, 'questoes', id + '.json'), 'utf8')));
          if (!q.success) problems.push(world + '/' + file + ': ' + id + ' invalida');
        } catch {
          problems.push(world + '/' + file + ': ' + id + ' nao existe');
        }
      }
    }
  }
  return problems;
}

if (process.argv[1]?.includes('validate-content')) {
  const problems = runValidation();
  if (problems.length) {
    console.error('Falhou com ' + problems.length + ' problema(s):');
    for (const p of problems) console.error(' - ' + p);
    process.exit(1);
  }
  console.log('validate:content OK');
}
`);

console.log('Bloco 2 concluido: schema, carregador, gerador e validador criados.');

// ==========================================
// ARQUIVO: bloco3.mjs
// ==========================================
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

// ==========================================
// ARQUIVO: bloco4.mjs
// ==========================================
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

w('src/services/save.ts', `import { z } from 'zod';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './i18n';

const KEY = 'coruja.save.v3';
const V2 = 'coruja.save.v2';
const V1 = 'coruja.save.v1';

export const starsSchema = z.number().int().min(0).max(3);

const settingsShape = {
  locale: z.enum(SUPPORTED_LOCALES),
  soundEnabled: z.boolean(),
  musicEnabled: z.boolean(),
  timedMode: z.boolean(),
  buttonsOnly: z.boolean(),
  highContrast: z.boolean(),
  dyslexiaFont: z.boolean(),
  fontScale: z.number().int().min(0).max(2),
  readOnlyMode: z.boolean(),
  analyticsConsent: z.boolean()
};

export const saveSchema = z.object({
  version: z.literal(3),
  coins: z.number().int().min(0),
  stars: z.record(z.string(), starsSchema),
  streak: z.number().int().min(0),
  lastPlayedDate: z.string().optional(),
  achievements: z.array(z.string()),
  bossesWon: z.array(z.string()),
  dailyDate: z.string().optional(),
  dailyDone: z.boolean(),
  cosmetics: z.object({
    owned: z.array(z.string()),
    equipped: z.object({ hat: z.string().optional(), colour: z.string().optional() })
  }),
  settings: z.object(settingsShape)
});

const v2Schema = z.object({
  version: z.literal(2),
  coins: z.number().int().min(0),
  stars: z.record(z.string(), starsSchema),
  streak: z.number().int().min(0),
  settings: z.object({
    locale: z.enum(SUPPORTED_LOCALES),
    soundEnabled: z.boolean(),
    timedMode: z.boolean(),
    buttonsOnly: z.boolean()
  })
});

const v1Schema = z.object({
  version: z.literal(1),
  coins: z.number().int().min(0),
  completedLevels: z.array(z.string()),
  settings: z.object({ locale: z.enum(SUPPORTED_LOCALES), soundEnabled: z.boolean() })
});

export type SaveData = z.infer<typeof saveSchema>;
export type Settings = SaveData['settings'];

export const DEFAULT_SAVE: SaveData = {
  version: 3,
  coins: 0,
  stars: {},
  streak: 0,
  achievements: [],
  bossesWon: [],
  dailyDone: false,
  cosmetics: { owned: ['chapeu-nenhum', 'cor-baia'], equipped: {} },
  settings: {
    locale: DEFAULT_LOCALE, soundEnabled: true, musicEnabled: true, timedMode: true,
    buttonsOnly: false, highContrast: false, dyslexiaFont: false, fontScale: 0,
    readOnlyMode: false, analyticsConsent: false
  }
};

function base(partial: Partial<Settings>): Settings {
  return { ...DEFAULT_SAVE.settings, ...partial };
}

export function migrateV2(raw: unknown): SaveData | null {
  const parsed = v2Schema.safeParse(raw);
  if (!parsed.success) return null;
  return {
    ...structuredClone(DEFAULT_SAVE),
    coins: parsed.data.coins,
    stars: parsed.data.stars,
    streak: parsed.data.streak,
    settings: base({
      locale: parsed.data.settings.locale,
      soundEnabled: parsed.data.settings.soundEnabled,
      timedMode: parsed.data.settings.timedMode,
      buttonsOnly: parsed.data.settings.buttonsOnly
    })
  };
}

export function migrateV1(raw: unknown): SaveData | null {
  const parsed = v1Schema.safeParse(raw);
  if (!parsed.success) return null;
  const stars: Record<string, number> = {};
  for (const id of parsed.data.completedLevels) stars[id] = 3;
  return {
    ...structuredClone(DEFAULT_SAVE),
    coins: parsed.data.coins,
    stars,
    settings: base({ locale: parsed.data.settings.locale, soundEnabled: parsed.data.settings.soundEnabled })
  };
}

function store(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

function raw(key: string): unknown {
  const s = store();
  if (!s) return null;
  const value = s.getItem(key);
  if (!value) return null;
  try { return JSON.parse(value) as unknown; } catch { return null; }
}

export function load(): SaveData {
  const s = store();
  if (!s) return structuredClone(DEFAULT_SAVE);
  const current = saveSchema.safeParse(raw(KEY));
  if (current.success) return current.data;
  const migrations: Array<[string, (v: unknown) => SaveData | null]> = [[V2, migrateV2], [V1, migrateV1]];
  for (const [key, migrate] of migrations) {
    const migrated = migrate(raw(key));
    if (migrated) { write(migrated); s.removeItem(key); return migrated; }
  }
  return structuredClone(DEFAULT_SAVE);
}

export function write(data: SaveData): SaveData {
  const s = store();
  if (s) s.setItem(KEY, JSON.stringify(data));
  return data;
}

export function update(change: (draft: SaveData) => void): SaveData {
  const draft = structuredClone(load());
  change(draft);
  return write(draft);
}

export function addCoins(amount: number): SaveData {
  return update((d) => { d.coins = Math.max(0, d.coins + amount); });
}

export function saveSettings(change: Partial<Settings>): SaveData {
  return update((d) => { d.settings = { ...d.settings, ...change }; });
}

export function recordLevelResult(levelId: string, stars: number): SaveData {
  return update((d) => {
    d.stars[levelId] = Math.max(d.stars[levelId] ?? 0, Math.min(3, Math.max(1, stars)));
  });
}
`);

w('src/services/i18n.ts', `import i18next from 'i18next';
import ptPT from '../locales/pt-PT.json';
import ptBR from '../locales/pt-BR.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import type { LocalizedText } from '../content/schema';

export const SUPPORTED_LOCALES = ['pt-PT', 'pt-BR', 'en', 'es'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt-PT';

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export async function initI18n(locale: Locale): Promise<void> {
  await i18next.init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    resources: {
      'pt-PT': { translation: ptPT },
      'pt-BR': { translation: ptBR },
      en: { translation: en },
      es: { translation: es }
    },
    interpolation: { escapeValue: false },
    returnNull: false
  });
}

export function t(key: string, options?: Record<string, unknown>): string {
  return String(i18next.t(key, options));
}

export function pick(text: LocalizedText): string {
  const locale = i18next.language;
  if (isLocale(locale)) {
    const value = text[locale];
    if (value) return value;
  }
  return text['pt-PT'];
}

export function formatEuro(centimos: number): string {
  return new Intl.NumberFormat(i18next.language, { style: 'currency', currency: 'EUR' }).format(centimos / 100);
}
`);

w('src/services/progress.ts', `import type { Level, WorldId } from '../content/schema';
import type { SaveData } from './save';

export type Stars = 0 | 1 | 2 | 3;

export function computeStars(errors: number): Stars {
  if (errors === 0) return 3;
  if (errors === 1) return 2;
  return 1;
}

export function featherReward(correct: number, stars: Stars): number {
  const bonus = stars === 3 ? 20 : stars === 2 ? 10 : 5;
  return correct * 5 + bonus;
}

export function isLevelUnlocked(save: SaveData, levels: readonly Level[], levelId: string): boolean {
  const position = levels.findIndex((level) => level.id === levelId);
  if (position <= 0) return position === 0;
  const previous = levels[position - 1];
  return previous ? (save.stars[previous.id] ?? 0) >= 1 : false;
}

export function isWorldComplete(save: SaveData, levels: readonly Level[]): boolean {
  return levels.length > 0 && levels.every((level) => (save.stars[level.id] ?? 0) >= 1);
}

export function isWorldUnlocked(save: SaveData, worldId: WorldId, order: readonly WorldId[], byWorld: Readonly<Record<string, readonly Level[]>>): boolean {
  const position = order.indexOf(worldId);
  if (position <= 0) return position === 0;
  const previous = order[position - 1];
  if (!previous) return false;
  return isWorldComplete(save, byWorld[previous] ?? []);
}

export function worldStars(save: SaveData, levels: readonly Level[]): number {
  return levels.reduce((total, level) => total + (save.stars[level.id] ?? 0), 0);
}
`);

w('src/services/streak.ts', `import { update } from './save';

const today = (): string => new Date().toISOString().slice(0, 10);

function gap(from: string, to: string): number {
  return Math.round((Date.parse(to + 'T00:00:00Z') - Date.parse(from + 'T00:00:00Z')) / 86400000);
}

export function registerPlay(date = today()): number {
  let result = 1;
  update((draft) => {
    if (draft.lastPlayedDate === date) { result = draft.streak || 1; return; }
    draft.streak = draft.lastPlayedDate && gap(draft.lastPlayedDate, date) === 1 ? draft.streak + 1 : 1;
    draft.lastPlayedDate = date;
    result = draft.streak;
  });
  return result;
}
`);

w('src/services/achievements.ts', `import type { SaveData } from './save';

export interface Extra { totalStars: number; levelsDone: number; perfectLevels: number; bossWins: number; coins: number; }

export interface Achievement {
  id: string;
  titulo: { 'pt-PT': string; en: string };
  condicao: string;
  check: (save: SaveData, extra: Extra) => boolean;
}

const done = (s: SaveData) => Object.values(s.stars).filter((v) => v >= 1).length;
const perfect = (s: SaveData) => Object.values(s.stars).filter((v) => v === 3).length;
const stars = (s: SaveData) => Object.values(s.stars).reduce((a, b) => a + b, 0);
const worldDone = (s: SaveData, w: number) => [1,2,3,4,5,6].every((n) => (s.stars['mundo-' + w + '-nivel-' + n] ?? 0) >= 1);

const mk = (id: string, pt: string, en: string, condicao: string, check: Achievement['check']): Achievement =>
  ({ id, titulo: { 'pt-PT': pt, en }, condicao, check });

export const ACHIEVEMENTS: readonly Achievement[] = [
  mk('a01','Primeiro passo','First step','Conclui 1 nivel',(s)=>done(s)>=1),
  mk('a02','Cinco niveis','Five levels','Conclui 5 niveis',(s)=>done(s)>=5),
  mk('a03','Dez niveis','Ten levels','Conclui 10 niveis',(s)=>done(s)>=10),
  mk('a04','Vinte niveis','Twenty levels','Conclui 20 niveis',(s)=>done(s)>=20),
  mk('a05','Trinta niveis','Thirty levels','Conclui 30 niveis',(s)=>done(s)>=30),
  mk('a06','Perfeicao','Perfection','Conclui 1 nivel com 3 estrelas',(s)=>perfect(s)>=1),
  mk('a07','Cinco perfeitos','Five perfect','Conclui 5 niveis perfeitos',(s)=>perfect(s)>=5),
  mk('a08','Dez perfeitos','Ten perfect','Conclui 10 niveis perfeitos',(s)=>perfect(s)>=10),
  mk('a09','Vinte perfeitos','Twenty perfect','Conclui 20 niveis perfeitos',(s)=>perfect(s)>=20),
  mk('a10','Estrela maior','Big star','Junta 30 estrelas',(s)=>stars(s)>=30),
  mk('a11','Constelacao','Constellation','Junta 60 estrelas',(s)=>stars(s)>=60),
  mk('a12','Ceu inteiro','Whole sky','Junta 100 estrelas',(s)=>stars(s)>=100),
  mk('a13','Penas a voar','Feathers','Junta 100 penas',(s)=>s.coins>=100),
  mk('a14','Saco cheio','Full bag','Junta 300 penas',(s)=>s.coins>=300),
  mk('a15','Tesouro','Treasure','Junta 600 penas',(s)=>s.coins>=600),
  mk('a16','Boss derrubado','Boss down','Vence 1 boss',(_s,e)=>e.bossWins>=1),
  mk('a17','Cacador','Hunter','Vence 3 bosses',(_s,e)=>e.bossWins>=3),
  mk('a18','Lenda','Legend','Vence os 6 bosses',(_s,e)=>e.bossWins>=6),
  mk('a19','Tres dias','Three days','Streak de 3 dias',(s)=>s.streak>=3),
  mk('a20','Semana cheia','Full week','Streak de 7 dias',(s)=>s.streak>=7),
  mk('a21','Mes a serio','Month','Streak de 30 dias',(s)=>s.streak>=30),
  mk('a22','Curioso','Curious','Abre o perfil',()=>true),
  mk('a23','Vaidoso','Vain','Equipa um chapeu',(s)=>Boolean(s.cosmetics.equipped.hat)),
  mk('a24','Colecionador','Collector','Compra 5 cosmeticos',(s)=>s.cosmetics.owned.length>=5),
  mk('a25','Guarda-roupa','Wardrobe','Compra 15 cosmeticos',(s)=>s.cosmetics.owned.length>=15),
  mk('a26','Vale completo','Valley','Completa o Mundo 1',(s)=>worldDone(s,1)),
  mk('a27','Cozinha limpa','Kitchen','Completa o Mundo 2',(s)=>worldDone(s,2)),
  mk('a28','Oficina arrumada','Workshop','Completa o Mundo 3',(s)=>worldDone(s,3)),
  mk('a29','Mercado fechado','Market','Completa o Mundo 4',(s)=>worldDone(s,4)),
  mk('a30','Observatorio lido','Observatory','Completa o Mundo 5',(s)=>worldDone(s,5)),
  mk('a31','Enigma resolvido','Enigma','Completa o Mundo 6',(s)=>worldDone(s,6)),
  mk('a32','Coruja completa','Owl complete','Junta 150 estrelas',(s)=>stars(s)>=150)
];

export function evaluate(save: SaveData, extra: Extra): string[] {
  return ACHIEVEMENTS
    .filter((a) => !save.achievements.includes(a.id) && a.check(save, extra))
    .map((a) => a.id);
}
`);

w('src/services/shop.ts', `export type CosmeticType = 'hat' | 'colour';

export interface Cosmetic { id: string; tipo: CosmeticType; nome: { 'pt-PT': string; en: string }; preco: number; valor: string; }

export const COSMETICS: readonly Cosmetic[] = [
  { id: 'chapeu-nenhum', tipo: 'hat', nome: { 'pt-PT': 'Sem chapeu', en: 'No hat' }, preco: 0, valor: 'none' },
  { id: 'chapeu-gorro', tipo: 'hat', nome: { 'pt-PT': 'Gorro', en: 'Beanie' }, preco: 60, valor: 'beanie' },
  { id: 'chapeu-cartola', tipo: 'hat', nome: { 'pt-PT': 'Cartola', en: 'Top hat' }, preco: 80, valor: 'tophat' },
  { id: 'chapeu-coroa', tipo: 'hat', nome: { 'pt-PT': 'Coroa', en: 'Crown' }, preco: 150, valor: 'crown' },
  { id: 'chapeu-bruxa', tipo: 'hat', nome: { 'pt-PT': 'Chapeu de bruxa', en: 'Witch hat' }, preco: 180, valor: 'witch' },
  { id: 'chapeu-halo', tipo: 'hat', nome: { 'pt-PT': 'Aureola', en: 'Halo' }, preco: 220, valor: 'halo' },
  { id: 'cor-baia', tipo: 'colour', nome: { 'pt-PT': 'Baia', en: 'Bay' }, preco: 0, valor: '#8e7cf0' },
  { id: 'cor-menta', tipo: 'colour', nome: { 'pt-PT': 'Menta', en: 'Mint' }, preco: 50, valor: '#3dd6a0' },
  { id: 'cor-coral', tipo: 'colour', nome: { 'pt-PT': 'Coral', en: 'Coral' }, preco: 50, valor: '#ff7a6e' },
  { id: 'cor-ambar', tipo: 'colour', nome: { 'pt-PT': 'Ambar', en: 'Amber' }, preco: 70, valor: '#ffb44d' },
  { id: 'cor-cobalto', tipo: 'colour', nome: { 'pt-PT': 'Cobalto', en: 'Cobalt' }, preco: 70, valor: '#4d7dff' },
  { id: 'cor-rosa', tipo: 'colour', nome: { 'pt-PT': 'Rosa', en: 'Pink' }, preco: 90, valor: '#ff8ac4' },
  { id: 'cor-neve', tipo: 'colour', nome: { 'pt-PT': 'Neve', en: 'Snow' }, preco: 120, valor: '#f2f2f7' },
  { id: 'cor-noite', tipo: 'colour', nome: { 'pt-PT': 'Noite', en: 'Night' }, preco: 140, valor: '#3a2f5c' }
];

export const byId = (id: string): Cosmetic | undefined => COSMETICS.find((item) => item.id === id);
export const itemsOf = (tipo: CosmeticType): readonly Cosmetic[] => COSMETICS.filter((item) => item.tipo === tipo);
export const colourValue = (id: string | undefined): string => byId(id ?? '')?.valor ?? '#8e7cf0';
`);

w('src/services/daily.ts', `import type { Question, WorldId } from '../content/schema';
import { loadWorldQuestions } from '../content/worlds';
import { load, update } from './save';

const hash = (text: string): number => {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) % 1000000007;
  return value;
};

export const todayKey = (): string => new Date().toISOString().slice(0, 10);

export function isDailyAvailable(): boolean {
  const save = load();
  return save.dailyDate !== todayKey() || !save.dailyDone;
}

export async function buildDaily(worldIds: readonly WorldId[]): Promise<Question[]> {
  const pool = (await Promise.all(worldIds.map((id) => loadWorldQuestions(id)))).flat();
  if (pool.length === 0) return [];
  const chosen: Question[] = [];
  const seen = new Set<string>();
  let cursor = hash(todayKey());
  while (chosen.length < 5 && seen.size < pool.length) {
    cursor = (cursor * 31 + 7) % pool.length;
    const question = pool[cursor];
    if (!question || seen.has(question.id)) continue;
    seen.add(question.id);
    chosen.push(question);
  }
  return chosen;
}

export function markDailyDone(): void {
  update((draft) => { draft.dailyDate = todayKey(); draft.dailyDone = true; });
}
`);

w('src/services/audio.ts', `type Sfx = 'click' | 'correct' | 'wrong' | 'coin' | 'star' | 'jump';

let ctx: AudioContext | null = null;
let sound = true;
let music = true;

function audio(): AudioContext | null {
  if (!ctx) { try { ctx = new AudioContext(); } catch { return null; } }
  return ctx;
}

export function configure(soundOn: boolean, musicOn: boolean): void { sound = soundOn; music = musicOn; }

const TONES: Record<Sfx, readonly [number, number, OscillatorType]> = {
  click: [520, 0.05, 'sine'], correct: [660, 0.14, 'sine'], wrong: [200, 0.2, 'sawtooth'],
  coin: [880, 0.08, 'triangle'], star: [990, 0.12, 'sine'], jump: [440, 0.06, 'sine']
};

export function play(sfx: Sfx): void {
  if (!sound) return;
  const context = audio();
  if (!context) return;
  const [frequency, duration, type] = TONES[sfx];
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.1, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}
`);

w('src/services/a11y.ts', `import type { Settings } from './save';

const SCALES = ['1', '1.15', '1.3'];

export function applyA11y(settings: Settings): void {
  const root = document.documentElement;
  root.style.setProperty('--font-scale', SCALES[settings.fontScale] ?? '1');
  root.dataset.contrast = settings.highContrast ? 'high' : 'normal';
  root.dataset.dyslexia = settings.dyslexiaFont ? 'on' : 'off';
  root.lang = settings.locale;
}
`);

w('src/services/telemetry.ts', `export type TelemetryEvent =
  | { name: 'app_open' }
  | { name: 'level_start'; levelId: string }
  | { name: 'level_complete'; levelId: string; correct: number; total: number }
  | { name: 'question_answered'; questionId: string; correct: boolean };

let enabled = false;
const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST;

export function setTelemetryConsent(value: boolean): void {
  enabled = value && Boolean(key) && Boolean(host);
}

export function track(event: TelemetryEvent): void {
  if (!enabled || !key || !host) return;
  void fetch(host + '/capture/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: key, event: event.name, properties: event, distinct_id: 'anon' })
  }).catch(() => undefined);
}
`);

w('src/vite-env.d.ts', `/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
}

interface ImportMeta { readonly env: ImportMetaEnv; }
`);

console.log('Bloco 4 concluido: servicos criados.');

// ==========================================
// ARQUIVO: bloco5.mjs
// ==========================================
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

w('src/main.ts', `import './styles/tokens.css';
import './styles/base.css';
import './styles/ui.css';
import { registerSW } from 'virtual:pwa-register';
import { applyA11y } from './services/a11y';
import { initI18n, DEFAULT_LOCALE, isLocale } from './services/i18n';
import { load } from './services/save';
import { startApp } from './ui/app';

registerSW({ immediate: true });

const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('Sem #app');

const save = load();
applyA11y(save.settings);
const browser = navigator.language;
const locale = isLocale(browser) ? browser : save.settings.locale;

void initI18n(locale).then(() => {
  document.documentElement.lang = locale;
  startApp(root);
});
`);

w('src/ui/dom.ts', `export function qs<T extends Element>(parent: ParentNode, selector: string): T {
  const el = parent.querySelector<T>(selector);
  if (!el) throw new Error('Elemento em falta: ' + selector);
  return el;
}
`);

w('src/ui/components/icons.ts', `const PATHS = {
  play: '<path d="M7 4l13 8-13 8z" />',
  next: '<path d="M5 12h14" /><path d="M13 6l6 6-6 6" />',
  exit: '<path d="M6 6l12 12" /><path d="M18 6L6 18" />',
  star: '<path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9 9.1 9z" />',
  feather: '<path d="M12 3c-3.2 3.2-5 6.3-5 9.4A5 5 0 0 0 12 17a5 5 0 0 0 5-4.6c0-3.1-1.8-6.2-5-9.4z" /><path d="M12 17v4" />',
  left: '<path d="M15 6l-6 6 6 6" />',
  right: '<path d="M9 6l6 6-6 6" />',
  up: '<path d="M6 15l6-6 6 6" />',
  lock: '<rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />',
  cog: '<circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" />',
  flame: '<path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9z" />',
  repeat: '<path d="M4 10V8a3 3 0 0 1 3-3h10" /><path d="M14 2l3 3-3 3" /><path d="M20 14v2a3 3 0 0 1-3 3H7" />'
} as const;

export type IconName = keyof typeof PATHS;

export function icon(name: IconName, size = 24): string {
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + PATHS[name] + '</svg>';
}
`);

w('src/ui/components/worldIcons.ts', `const PATHS: Record<string, string> = {
  numeros: '<path d="M6 4v16" /><path d="M18 4v16" /><path d="M3 9h18" /><path d="M3 15h18" />',
  fracoes: '<circle cx="9" cy="9" r="5" /><path d="M14 14l6 6" />',
  geometria: '<path d="M12 3l9 17H3z" /><path d="M12 10v6" />',
  percentagens: '<circle cx="7" cy="7" r="3" /><circle cx="17" cy="17" r="3" /><path d="M19 5L5 19" />',
  estatistica: '<path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" />',
  logica: '<circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" />'
};

export function worldIcon(name: string, size = 32): string {
  const path = PATHS[name] ?? PATHS.logica;
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' + path + '</svg>';
}
`);

w('src/ui/components/owl.ts', `const HATS: Record<string, string> = {
  beanie: '<path d="M32 22a28 28 0 0 1 56 0z" fill="#ff7a6e" stroke="#241c2e" stroke-width="3" />',
  tophat: '<rect x="36" y="6" width="48" height="26" fill="#241c2e" /><rect x="26" y="30" width="68" height="8" fill="#241c2e" />',
  crown: '<path d="M32 34l8-20 10 12 10-12 8 20z" fill="#fdcb6e" stroke="#241c2e" stroke-width="3" />',
  witch: '<path d="M60 2l26 36H34z" fill="#3a2f5c" /><rect x="28" y="34" width="64" height="8" fill="#3a2f5c" />',
  halo: '<ellipse cx="60" cy="14" rx="24" ry="7" fill="none" stroke="#fdcb6e" stroke-width="5" />'
};

export function owlSvg(size = 132, hat?: string, colour = '#8e7cf0'): string {
  return '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">'
    + '<ellipse cx="60" cy="70" rx="34" ry="38" fill="' + colour + '" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="48" cy="50" r="14" fill="#fff" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="72" cy="50" r="14" fill="#fff" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="48" cy="51" r="6" fill="#241c2e" /><circle cx="72" cy="51" r="6" fill="#241c2e" />'
    + '<path d="M60 62 L52 74 L68 74 Z" fill="#fdcb6e" stroke="#241c2e" stroke-width="3" />'
    + (HATS[hat ?? ''] ?? '') + '</svg>';
}
`);

w('src/ui/components/visual.ts', `import type { Visual } from '../../content/schema';
import { formatEuro } from '../../services/i18n';

function pizza(fatias: number, comidas: number): string {
  const r = 58; const c = 70; const step = (Math.PI * 2) / fatias;
  let out = '';
  for (let i = 0; i < fatias; i += 1) {
    const a0 = -Math.PI / 2 + i * step; const a1 = a0 + step;
    const x0 = c + r * Math.cos(a0); const y0 = c + r * Math.sin(a0);
    const x1 = c + r * Math.cos(a1); const y1 = c + r * Math.sin(a1);
    const large = step > Math.PI ? 1 : 0;
    out += '<path d="M' + c + ' ' + c + ' L' + x0.toFixed(2) + ' ' + y0.toFixed(2) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' Z" fill="' + (i < comidas ? '#fdcb6e' : '#fff') + '" stroke="#241c2e" stroke-width="2.5" />';
  }
  return '<svg viewBox="0 0 140 140" width="140" height="140" role="img">' + out + '</svg>';
}

function bar(n: number, d: number, color: string): string {
  const h = 120; const seg = h / d; let out = '';
  for (let i = 0; i < d; i += 1) {
    out += '<rect x="0" y="' + (i * seg).toFixed(2) + '" width="38" height="' + seg.toFixed(2) + '" fill="' + (i < n ? color : '#fff') + '" stroke="#241c2e" stroke-width="2" />';
  }
  return '<svg viewBox="0 0 38 120" width="38" height="120" role="img">' + out + '</svg>';
}

export function renderVisual(visual: Visual | undefined): string {
  if (!visual) return '';
  if (visual.tipo === 'pizza') return '<div class="visual__label">' + pizza(visual.fatias, visual.comidas) + '</div>';
  if (visual.tipo === 'fracaoComparada') {
    return '<div class="visual__label">' + bar(visual.a.n, visual.a.d, '#6c5ce7') + visual.a.n + '/' + visual.a.d + '</div>'
      + '<div class="visual__label">' + bar(visual.b.n, visual.b.d, '#fdcb6e') + visual.b.n + '/' + visual.b.d + '</div>';
  }
  return '<div class="visual__label">' + formatEuro(visual.precoCentimos) + '<br>- ' + visual.percentagem + ' %</div>';
}
`);

w('src/ui/components/dialog.ts', `export function openSheet(title: string, build: (body: HTMLElement) => void): void {
  const dialog = document.createElement('dialog');
  dialog.className = 'sheet';
  const header = document.createElement('div');
  header.className = 'sheet__header';
  const h = document.createElement('h2');
  h.textContent = title;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn btn--ghost btn--icon';
  close.textContent = 'x';
  close.setAttribute('aria-label', 'Fechar');
  header.append(h, close);
  const body = document.createElement('div');
  body.className = 'sheet__body';
  dialog.append(header, body);
  document.body.append(dialog);
  const finish = (): void => { dialog.close(); dialog.remove(); };
  close.addEventListener('click', finish);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); finish(); });
  build(body);
  dialog.showModal();
  h.tabIndex = -1;
  h.focus();
}
`);

w('src/game/game.ts', `import Phaser from 'phaser';
import { PlayScene, type PlayLevelData } from './scenes/PlayScene';

export interface GameHandle {
  startLevel(options: readonly string[], onPick: (index: number) => void, boss: boolean): void;
  setInput(dir: -1 | 0 | 1): void;
  jump(): void;
  celebrate(): void;
  destroy(): void;
}

export function createGame(parent: HTMLElement): GameHandle {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#dff6ff',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 720, height: 300 },
    physics: { default: 'matter', matter: { gravity: { x: 0, y: 1.1 }, debug: false } },
    scene: [PlayScene]
  });

  let scene: PlayScene | null = null;
  let pending: PlayLevelData | null = null;

  game.events.once(Phaser.Core.Events.READY, () => {
    scene = game.scene.getScene('Play') as PlayScene;
    if (pending) { scene.setLevel(pending); pending = null; }
  });

  return {
    startLevel(options, onPick, boss) {
      const data: PlayLevelData = { options, onPick, boss };
      if (scene) scene.setLevel(data); else pending = data;
    },
    setInput(dir) { scene?.setInput(dir); },
    jump() { scene?.jump(); },
    celebrate() { scene?.celebrate(); },
    destroy() { game.destroy(true); }
  };
}
`);

w('src/game/scenes/PlayScene.ts', `import Phaser from 'phaser';

export interface PlayLevelData { options: readonly string[]; onPick: (index: number) => void; boss: boolean; }

const W = 720; const H = 300;
const OX = [104, 284, 460, 636];
const OY = [196, 156, 188, 148];
const COLORS = [0xff7675, 0x74b9ff, 0x55efc4, 0xffeaa7];
const R = 26;
const START = { x: 360, y: 240 };

export class PlayScene extends Phaser.Scene {
  private level: PlayLevelData = { options: [], onPick: () => undefined, boss: false };
  private built = false;
  private locked = true;
  private dir: -1 | 0 | 1 = 0;
  private jumpQueued = false;
  private owl?: Phaser.Physics.Matter.Sprite;
  private orbs: MatterJS.BodyType[] = [];
  private objects: Phaser.GameObjects.GameObject[] = [];
  private keys: Phaser.Input.Keyboard.Key[] = [];

  constructor() { super('Play'); }

  create(): void {
    this.build();
    this.built = true;
    if (this.level.options.length > 0) this.apply();
  }

  setLevel(data: PlayLevelData): void { this.level = data; if (this.built) this.apply(); }
  setInput(dir: -1 | 0 | 1): void { this.dir = dir; }
  jump(): void { this.jumpQueued = true; }

  celebrate(): void {
    if (!this.owl) return;
    this.tweens.add({ targets: this.owl, scaleX: 1.25, scaleY: 1.25, duration: 140, yoyo: true });
  }

  update(): void {
    const owl = this.owl;
    if (!owl || this.locked) return;
    const left = this.dir === -1 || this.keys.some((k) => k.isDown && (k.keyCode === 37 || k.keyCode === 65));
    const right = this.dir === 1 || this.keys.some((k) => k.isDown && (k.keyCode === 39 || k.keyCode === 68));
    const force = 0.0035;
    if (left && !right) owl.applyForce(new Phaser.Math.Vector2(-force, 0));
    else if (right && !left) owl.applyForce(new Phaser.Math.Vector2(force, 0));
    const vx = owl.body.velocity.x;
    if (Math.abs(vx) > 6) owl.setVelocityX(Math.sign(vx) * 6);
    const jump = this.jumpQueued || this.keys.some((k) => k.isDown && (k.keyCode === 32 || k.keyCode === 38 || k.keyCode === 87));
    if (jump && Math.abs(owl.body.velocity.y) < 0.8) owl.setVelocityY(-9);
    this.jumpQueued = false;
  }

  private build(): void {
    this.makeOwl();
    this.matter.world.setBounds(0, 0, W, H);
    const g = this.add.graphics();
    g.fillStyle(0x77c66e, 1);
    g.fillRect(0, H - 14, W, 14);
    const layer = this.add.graphics();
    layer.fillStyle(0x9be08d, 1);
    layer.lineStyle(3, 0x241c2e, 1);
    for (const p of [{ x: 104, y: 238 }, { x: 284, y: 198 }, { x: 460, y: 230 }, { x: 636, y: 190 }]) {
      layer.fillRoundedRect(p.x - 58, p.y, 116, 14, 7);
      this.matter.add.rectangle(p.x, p.y + 7, 116, 14, { isStatic: true, label: 'plataforma' });
    }
    this.owl = this.matter.add.sprite(START.x, START.y, 'owl');
    this.owl.setFrictionAir(0.03);
    this.owl.setBounce(0.05);
    this.owl.setFixedRotation();
    this.matter.world.on('collisionstart', (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
      if (this.locked) return;
      for (const pair of event.pairs) {
        for (const body of [pair.bodyA, pair.bodyB]) {
          if (!body.label.startsWith('orb-')) continue;
          this.locked = true;
          this.level.onPick(Number(body.label.slice(4)));
          return;
        }
      }
    });
    const kb = this.input.keyboard;
    if (kb) {
      kb.addCapture(['LEFT', 'RIGHT', 'UP', 'SPACE', 'A', 'D', 'W']);
      for (const code of ['LEFT', 'RIGHT', 'UP', 'SPACE', 'A', 'D', 'W']) {
        const key = kb.addKey(Phaser.Input.Keyboard.KeyCodes[code as keyof typeof Phaser.Input.Keyboard.KeyCodes]);
        this.keys.push(key);
      }
    }
  }

  private apply(): void {
    for (const body of this.orbs) this.matter.world.remove(body);
    for (const obj of this.objects) obj.destroy();
    this.orbs = [];
    this.objects = [];
    this.locked = false;
    this.dir = 0;
    this.cameras.main.setBackgroundColor(this.level.boss ? '#2b1b3d' : '#dff6ff');
    if (this.owl) { this.owl.setPosition(START.x, START.y); this.owl.setVelocity(0, 0); }

    this.level.options.forEach((text, i) => {
      const x = OX[i] ?? 104; const y = OY[i] ?? 196;
      this.orbs.push(this.matter.add.circle(x, y, R, { isStatic: true, isSensor: true, label: 'orb-' + i }));
      const circle = this.add.graphics();
      circle.fillStyle(COLORS[i] ?? 0xffeaa7, 1);
      circle.lineStyle(3, 0x241c2e, 1);
      circle.fillCircle(x, y, R);
      circle.strokeCircle(x, y, R);
      const label = this.add.text(x, y, text, { fontFamily: 'Inter, sans-serif', fontSize: '15px', fontStyle: 'bold', color: '#241c2e' }).setOrigin(0.5);
      this.objects.push(circle, label);
    });
  }

  private makeOwl(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x8e7cf0, 1);
    g.lineStyle(3, 0x241c2e, 1);
    g.fillEllipse(22, 28, 32, 38);
    g.strokeEllipse(22, 28, 32, 38);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(15, 20, 8); g.fillCircle(29, 20, 8);
    g.fillStyle(0x241c2e, 1);
    g.fillCircle(15, 20, 3.4); g.fillCircle(29, 20, 3.4);
    g.fillStyle(0xfdcb6e, 1);
    g.fillTriangle(22, 27, 18, 33, 26, 33);
    g.generateTexture('owl', 44, 50);
    g.destroy();
  }
}
`);

w('src/styles/tokens.css', `:root {
  --color-primary: #6c5ce7;
  --color-primary-strong: #4834d4;
  --color-primary-soft: #efeaff;
  --color-secondary: #fdcb6e;
  --color-success: #00b894;
  --color-success-soft: #e3f7ee;
  --color-error: #d63031;
  --color-error-soft: #fdecea;
  --color-ink: #2d3436;
  --color-ink-soft: #636e72;
  --color-surface: #fdfbf7;
  --color-surface-raised: #ffffff;
  --color-border: #dfe6e9;
  --color-arena: #dff6ff;
  --font-display: 'Fredoka', system-ui, sans-serif;
  --font-reading: 'Inter', system-ui, sans-serif;
  --font-scale: 1;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 24px; --space-6: 32px;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px; --radius-pill: 999px;
  --shadow-press: 0 3px 0 var(--color-primary-strong);
  --focus-ring: 0 0 0 3px #74b9ff;
  --tap: 48px;
}
:root[data-contrast='high'] {
  --color-ink: #000; --color-ink-soft: #000; --color-surface: #fff; --color-surface-raised: #fff;
  --color-border: #000; --color-primary: #3a0f9e; --focus-ring: 0 0 0 3px #000;
}
:root[data-dyslexia='on'] body { font-family: 'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif; letter-spacing: 0.02em; }
`);

w('src/styles/base.css', `*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { min-height: 100dvh; background: linear-gradient(160deg, #efeaff, #fdfbf7 45%, #fff3d9); color: var(--color-ink); font-family: var(--font-reading); font-size: calc(16px * var(--font-scale)); line-height: 1.5; }
#app { min-height: 100dvh; display: flex; justify-content: center; padding: var(--space-4); }
.screen { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: var(--space-4); }
h1, h2 { font-family: var(--font-display); margin: 0; line-height: 1.15; }
h1 { font-size: calc(26px * var(--font-scale)); }
p { margin: 0; }
:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-sm); }
`);

w('src/styles/ui.css', `.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: var(--tap); padding: var(--space-3) var(--space-5); border: 0; border-radius: var(--radius-md); font-family: var(--font-display); font-size: calc(17px * var(--font-scale)); font-weight: 600; cursor: pointer; }
.btn--primary { background: var(--color-primary); color: #fff; box-shadow: var(--shadow-press); }
.btn--ghost { background: var(--color-surface-raised); color: var(--color-ink); border: 2px solid var(--color-border); }
.btn--icon { min-width: var(--tap); padding: var(--space-2); }
.card { background: var(--color-surface-raised); border: 2px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); }
.topbar { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.streak { display: inline-flex; align-items: center; gap: 2px; margin-left: var(--space-2); }
.chip { display: inline-flex; align-items: center; gap: var(--space-1); padding: var(--space-1) var(--space-3); border-radius: var(--radius-pill); background: var(--color-primary-soft); color: var(--color-primary-strong); font-family: var(--font-display); font-size: calc(14px * var(--font-scale)); }
.world-list, .level-list, .stat-list, .shop-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.world { width: 100%; display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); border: 3px solid var(--world); border-radius: var(--radius-lg); background: var(--world-soft); text-align: left; cursor: pointer; font-family: var(--font-display); }
.world.is-locked { filter: grayscale(0.7); opacity: 0.7; }
.world__icon { color: var(--world); }
.world__body { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.world__name { font-size: calc(17px * var(--font-scale)); font-weight: 700; }
.world__desc, .world__meta { font-family: var(--font-reading); font-size: calc(13px * var(--font-scale)); color: var(--color-ink-soft); }
.level { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-4); border: 2px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface-raised); }
.level__stars { display: flex; gap: 2px; color: var(--color-secondary); }
.level__stars .is-off { color: var(--color-border); }
.level__actions { display: flex; gap: var(--space-2); }
.level__actions .btn { flex: 1; }
.hud { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.hud__progress { font-family: var(--font-display); color: var(--color-ink-soft); }
.hud__timer { font-family: var(--font-display); color: var(--color-error); font-weight: 700; }
.question { font-size: calc(18px * var(--font-scale)); font-weight: 700; }
.visual { display: flex; justify-content: center; gap: var(--space-5); padding: var(--space-3); background: var(--color-surface-raised); border: 2px dashed var(--color-border); border-radius: var(--radius-lg); min-height: 96px; align-items: center; }
.visual__label { font-family: var(--font-display); font-size: calc(15px * var(--font-scale)); text-align: center; }
.arena { width: 100%; aspect-ratio: 720 / 300; border: 2px solid var(--color-primary); border-radius: var(--radius-lg); overflow: hidden; background: var(--color-arena); touch-action: none; }
.controls, .bottom-nav, .map-footer { display: flex; gap: var(--space-2); }
.bottom-nav .btn { flex: 1; }
.options { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
.option { min-height: 60px; padding: var(--space-3); border: 2px solid var(--color-primary); border-radius: var(--radius-md); background: var(--color-surface-raised); font-family: var(--font-display); font-size: calc(17px * var(--font-scale)); font-weight: 600; cursor: pointer; }
.option.is-correct { background: var(--color-success); border-color: var(--color-success); color: #fff; }
.option.is-wrong { background: var(--color-error); border-color: var(--color-error); color: #fff; }
.feedback { border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); }
.feedback.is-correct { background: var(--color-success-soft); border: 2px solid var(--color-success); }
.feedback.is-wrong { background: var(--color-error-soft); border: 2px solid var(--color-error); }
.feedback__title { font-family: var(--font-display); font-size: calc(18px * var(--font-scale)); font-weight: 700; }
.feedback__label { font-size: calc(13px * var(--font-scale)); text-transform: uppercase; color: var(--color-ink-soft); font-weight: 700; }
.complete { align-items: center; text-align: center; }
.complete__stars { display: flex; gap: var(--space-2); color: var(--color-secondary); }
.complete__stars .is-off { color: var(--color-border); }
.complete__actions { display: flex; flex-direction: column; gap: var(--space-2); width: 100%; }
.sheet { border: 0; border-radius: var(--radius-lg) var(--radius-lg) 0 0; padding: var(--space-4); width: min(520px, 100%); margin: auto auto 0; background: var(--color-surface); }
.sheet::backdrop { background: rgb(20 15 27 / 55%); }
.sheet__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); }
.sheet__body { display: flex; flex-direction: column; gap: var(--space-3); }
.row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); padding: var(--space-3); border: 2px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface-raised); }
.achievement-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2); }
.achievement { display: flex; align-items: center; gap: var(--space-1); padding: var(--space-2); border: 2px solid var(--color-border); border-radius: var(--radius-sm); font-size: calc(12px * var(--font-scale)); opacity: 0.45; }
.achievement.is-unlocked { opacity: 1; border-color: var(--color-secondary); background: var(--color-primary-soft); }
.shop-item { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-3); border: 2px solid var(--color-border); border-radius: var(--radius-md); }
.shop-item__preview { height: 40px; border-radius: var(--radius-sm); border: 2px solid var(--color-border); }
.tabs { display: flex; gap: var(--space-2); }
.tab { flex: 1; padding: var(--space-2); border: 2px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-surface-raised); font-family: var(--font-display); cursor: pointer; }
.tab.is-active { background: var(--color-primary); color: #fff; }
.gate-input { width: 100%; padding: var(--space-3); font-size: calc(18px * var(--font-scale)); border: 2px solid var(--color-border); border-radius: var(--radius-md); }
.report-table { width: 100%; border-collapse: collapse; }
.report-table th, .report-table td { border: 1px solid var(--color-border); padding: var(--space-2); text-align: left; }
.profile-owl { display: flex; justify-content: center; }
`);

console.log('Bloco 5 concluido: jogo, UI e estilos criados.');

// ==========================================
// ARQUIVO: bloco6.mjs
// ==========================================
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


// ==========================================
// ARQUIVO: bloco7.mjs
// ==========================================
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const w = (p, c) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, c); };

w('src/ui/screens/worldMap.ts', `import type { Level, World, WorldId } from '../../content/schema';
import { pick, t } from '../../services/i18n';
import { isWorldComplete, isWorldUnlocked, worldStars } from '../../services/progress';
import type { SaveData } from '../../services/save';
import { icon } from '../components/icons';
import { worldIcon } from '../components/worldIcons';
import { qs } from '../dom';

export interface WorldMapDeps {
  worlds: readonly World[];
  byWorld: Readonly<Record<string, readonly Level[]>>;
  save: SaveData;
  dailyAvailable: boolean;
  onWorld: (id: WorldId) => void;
  onProfile: () => void;
  onSettings: () => void;
  onShop: () => void;
  onDaily: () => void;
  onParents: () => void;
  onCredits: () => void;
}

export function renderWorldMap(root: HTMLElement, deps: WorldMapDeps): void {
  const order = deps.worlds.map((w) => w.id);
  const cards = deps.worlds.map((world) => {
    const levels = deps.byWorld[world.id] ?? [];
    const unlocked = isWorldUnlocked(deps.save, world.id, order, deps.byWorld);
    const complete = isWorldComplete(deps.save, levels);
    return '<li><button class="world ' + (unlocked ? '' : 'is-locked') + '" type="button" data-world="' + world.id + '" '
      + (unlocked ? '' : 'disabled') + ' style="--world:' + world.cor + ';--world-soft:' + world.corSuave + '">'
      + '<span class="world__icon">' + worldIcon(world.icone) + '</span><span class="world__body">'
      + '<span class="world__name">' + pick(world.nome) + '</span>'
      + '<span class="world__desc">' + pick(world.descricao) + '</span>'
      + '<span class="world__meta">' + t('world.progress', { done: worldStars(deps.save, levels), total: levels.length * 3 }) + '</span></span>'
      + '<span class="world__state">' + (complete ? icon('star', 20) : unlocked ? icon('next', 20) : icon('lock', 20)) + '</span></button></li>';
  }).join('');

  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-settings aria-label="' + t('settings.open') + '">' + icon('cog', 20) + '</button>'
    + '<button class="btn btn--ghost" type="button" data-profile>' + icon('feather', 18) + deps.save.coins
    + '<span class="streak">' + icon('flame', 18) + deps.save.streak + '</span></button></header>'
    + '<h1>' + t('world.title') + '</h1><ul class="world-list">' + cards + '</ul>'
    + '<nav class="bottom-nav"><button class="btn btn--ghost" type="button" data-daily>' + icon('flame', 18) + t('daily.open') + '</button>'
    + '<button class="btn btn--ghost" type="button" data-shop>' + icon('feather', 18) + t('shop.open') + '</button></nav>'
    + '<footer class="map-footer"><button class="btn btn--ghost" type="button" data-parents>' + t('parents.title') + '</button>'
    + '<button class="btn btn--ghost" type="button" data-credits>' + t('credits.title') + '</button></footer></main>';

  qs<HTMLButtonElement>(root, '[data-settings]').addEventListener('click', deps.onSettings);
  qs<HTMLButtonElement>(root, '[data-profile]').addEventListener('click', deps.onProfile);
  qs<HTMLButtonElement>(root, '[data-shop]').addEventListener('click', deps.onShop);
  qs<HTMLButtonElement>(root, '[data-daily]').addEventListener('click', deps.onDaily);
  qs<HTMLButtonElement>(root, '[data-parents]').addEventListener('click', deps.onParents);
  qs<HTMLButtonElement>(root, '[data-credits]').addEventListener('click', deps.onCredits);
  root.querySelectorAll<HTMLButtonElement>('[data-world]').forEach((b) => {
    b.addEventListener('click', () => { const id = b.dataset.world; if (id) deps.onWorld(id as WorldId); });
  });
}
`);

w('src/ui/screens/levelSelect.ts', `import type { Level, World } from '../../content/schema';
import { pick, t } from '../../services/i18n';
import { isLevelUnlocked } from '../../services/progress';
import type { SaveData } from '../../services/save';
import { icon } from '../components/icons';
import { worldIcon } from '../components/worldIcons';
import { qs } from '../dom';

export interface LevelSelectDeps {
  world: World;
  levels: readonly Level[];
  save: SaveData;
  onBack: () => void;
  onPlay: (levelId: string, training: boolean) => void;
}

export function renderLevelSelect(root: HTMLElement, deps: LevelSelectDeps): void {
  const cards = deps.levels.map((level) => {
    const unlocked = isLevelUnlocked(deps.save, deps.levels, level.id);
    const stars = deps.save.stars[level.id] ?? 0;
    const mark = [0, 1, 2].map((i) => '<span class="' + (i < stars ? '' : 'is-off') + '">' + icon('star', 18) + '</span>').join('');
    return '<li class="level ' + (unlocked ? '' : 'is-locked') + '">'
      + '<span class="level__stars" role="img" aria-label="' + t('level.stars', { count: stars }) + '">' + mark + '</span>'
      + '<span>' + pick(level.titulo) + '</span><div class="level__actions">'
      + '<button class="btn btn--primary" type="button" data-play="' + level.id + '" ' + (unlocked ? '' : 'disabled') + '>' + icon('play', 18) + t('level.play') + '</button>'
      + '<button class="btn btn--ghost" type="button" data-train="' + level.id + '" ' + (unlocked ? '' : 'disabled') + '>' + t('level.train') + '</button>'
      + '</div></li>';
  }).join('');

  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button>'
    + '<h1>' + worldIcon(deps.world.icone, 24) + ' ' + pick(deps.world.nome) + '</h1></header>'
    + '<ul class="level-list">' + cards + '</ul></main>';

  qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', deps.onBack);
  root.querySelectorAll<HTMLButtonElement>('[data-play]').forEach((b) => {
    b.addEventListener('click', () => { const id = b.dataset.play; if (id) deps.onPlay(id, false); });
  });
  root.querySelectorAll<HTMLButtonElement>('[data-train]').forEach((b) => {
    b.addEventListener('click', () => { const id = b.dataset.train; if (id) deps.onPlay(id, true); });
  });
}
`);

w('src/ui/screens/game.ts', `import type { Question } from '../../content/schema';
import type { GameHandle } from '../../game/game';
import { pick, t } from '../../services/i18n';
import { play } from '../../services/audio';
import { icon } from '../components/icons';
import { renderVisual } from '../components/visual';
import { qs } from '../dom';

export interface GameResult { correct: number; total: number; errors: number; }

export interface GameDeps {
  questions: readonly Question[];
  training: boolean;
  boss: boolean;
  timed: boolean;
  buttonsOnly: boolean;
  readOnly: boolean;
  mountGame: (arena: HTMLElement) => GameHandle;
  onExit: () => void;
  onFinish: (r: GameResult) => void;
}

const SECONDS = 20;

export function renderGame(root: HTMLElement, deps: GameDeps): void {
  const total = deps.questions.length;
  let index = 0; let correct = 0; let errors = 0; let lives = 3; let answered = false;
  let timer: number | null = null; let remaining = SECONDS;

  root.innerHTML = '<main class="screen"><div class="hud">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-exit aria-label="' + t('game.exit') + '">' + icon('exit', 20) + '</button>'
    + '<span class="hud__progress" data-progress role="status" aria-live="polite"></span>'
    + (deps.boss ? '<span class="chip" data-lives></span>' : '')
    + (deps.boss && deps.timed ? '<span class="hud__timer" data-timer></span>' : '')
    + '</div><div class="card"><p class="question" data-question></p></div>'
    + '<div class="visual" data-visual></div><div class="arena" data-arena aria-label="' + t('game.arena') + '"></div>'
    + '<div class="controls" data-controls>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-left aria-label="' + t('game.left') + '">' + icon('left') + '</button>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-jump aria-label="' + t('game.jump') + '">' + icon('up') + '</button>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-right aria-label="' + t('game.right') + '">' + icon('right') + '</button></div>'
    + '<div class="options" data-options role="group" aria-label="' + t('game.options') + '"></div>'
    + '<div class="feedback" data-feedback hidden aria-live="assertive"><p class="feedback__title" data-title></p>'
    + '<span class="feedback__label">' + t('game.explanation') + '</span><p data-explanation></p>'
    + '<button class="btn btn--primary" type="button" data-next>' + icon('next', 20) + '<span data-next-label></span></button></div></main>';

  const progressEl = qs<HTMLSpanElement>(root, '[data-progress]');
  const questionEl = qs<HTMLParagraphElement>(root, '[data-question]');
  const visualEl = qs<HTMLDivElement>(root, '[data-visual]');
  const optionsEl = qs<HTMLDivElement>(root, '[data-options]');
  const feedbackEl = qs<HTMLDivElement>(root, '[data-feedback]');
  const titleEl = qs<HTMLParagraphElement>(root, '[data-title]');
  const explanationEl = qs<HTMLParagraphElement>(root, '[data-explanation]');
  const nextBtn = qs<HTMLButtonElement>(root, '[data-next]');
  const nextLabel = qs<HTMLSpanElement>(root, '[data-next-label]');
  const arenaEl = qs<HTMLDivElement>(root, '[data-arena]');
  const controlsEl = qs<HTMLDivElement>(root, '[data-controls]');
  const livesEl = root.querySelector<HTMLSpanElement>('[data-lives]');
  const timerEl = root.querySelector<HTMLSpanElement>('[data-timer]');

  if (deps.buttonsOnly) { arenaEl.hidden = true; controlsEl.hidden = true; }
  const game = deps.buttonsOnly ? null : deps.mountGame(arenaEl);

  const paintLives = (): void => { if (livesEl) livesEl.textContent = '#'.repeat(lives); };
  const stop = (): void => { if (timer !== null) window.clearInterval(timer); timer = null; };

  const finishQuestion = (question: Question, choice: number): void => {
    answered = true;
    stop();
    const right = choice === question.resposta;
    if (right) correct += 1; else { errors += 1; if (deps.boss) { lives -= 1; paintLives(); } }
    optionsEl.querySelectorAll<HTMLButtonElement>('.option').forEach((b, i) => {
      b.disabled = true;
      if (i === question.resposta) b.classList.add('is-correct');
      else if (i === choice) b.classList.add('is-wrong');
    });
    if (right) game?.celebrate();
    play(right ? 'correct' : 'wrong');
    feedbackEl.hidden = false;
    feedbackEl.className = 'feedback ' + (right ? 'is-correct' : 'is-wrong');
    titleEl.textContent = right ? t('game.correct') : t('game.wrong');
    explanationEl.textContent = pick(question.explicacao);
    nextLabel.textContent = index === total - 1 || (deps.boss && lives <= 0) ? t('game.finish') : t('game.next');
    nextBtn.focus();
  };

  const handlePick = (choice: number): void => {
    if (answered) return;
    finishQuestion(deps.questions[index], choice);
  };

  const startTimer = (): void => {
    stop();
    if (!deps.boss || !deps.timed || !timerEl) return;
    remaining = SECONDS;
    timerEl.textContent = remaining + 's';
    timer = window.setInterval(() => {
      remaining -= 1;
      timerEl.textContent = remaining + 's';
      if (remaining <= 0) handlePick(-1);
    }, 1000);
  };

  const show = (): void => {
    const question = deps.questions[index];
    answered = false;
    progressEl.textContent = t('game.progress', { current: index + 1, total });
    questionEl.textContent = pick(question.pergunta);
    visualEl.innerHTML = renderVisual(question.visual);
    optionsEl.innerHTML = '';
    feedbackEl.hidden = true;
    question.opcoes.forEach((label, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'option'; b.textContent = label;
      b.addEventListener('click', () => handlePick(i));
      optionsEl.appendChild(b);
    });
    if (deps.readOnly) { finishQuestion(question, question.resposta); return; }
    game?.startLevel(question.opcoes, handlePick, deps.boss);
    startTimer();
  };

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    if (index === total - 1 || (deps.boss && lives <= 0)) { deps.onFinish({ correct, total, errors }); return; }
    index += 1;
    show();
  });

  qs<HTMLButtonElement>(root, '[data-exit]').addEventListener('click', () => { stop(); deps.onExit(); });

  if (game) {
    const hold = (sel: string, down: () => void, up: () => void): void => {
      const b = qs<HTMLButtonElement>(root, sel);
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); down(); });
      for (const type of ['pointerup', 'pointercancel', 'pointerleave']) b.addEventListener(type, up);
    };
    hold('[data-left]', () => game.setInput(-1), () => game.setInput(0));
    hold('[data-right]', () => game.setInput(1), () => game.setInput(0));
    qs<HTMLButtonElement>(root, '[data-jump]').addEventListener('pointerdown', (e) => { e.preventDefault(); game.jump(); });
  }

  paintLives();
  show();
}
`);

w('src/ui/screens/complete.ts', `import { t } from '../../services/i18n';
import { icon } from '../components/icons';
import { owlSvg } from '../components/owl';
import { qs } from '../dom';

export interface CompleteDeps {
  stars: number; feathers: number; correct: number; total: number; training: boolean; hasNext: boolean;
  onRepeat: () => void; onNext: () => void; onMap: () => void;
}

export function renderComplete(root: HTMLElement, deps: CompleteDeps): void {
  const marks = [0, 1, 2].map((i) => '<span class="' + (i < deps.stars ? '' : 'is-off') + '">' + icon('star', 36) + '</span>').join('');
  root.innerHTML = '<main class="screen complete">' + owlSvg(110)
    + '<h1>' + t('complete.title') + '</h1>'
    + '<div class="complete__stars" role="img" aria-label="' + t('level.stars', { count: deps.stars }) + '">' + marks + '</div>'
    + '<p>' + t('complete.score', { correct: deps.correct, total: deps.total }) + '</p>'
    + (deps.training ? '<p class="chip">' + t('complete.trainingNote') + '</p>'
      : '<p class="chip">' + icon('feather', 16) + t('complete.coins', { count: deps.feathers }) + '</p>')
    + '<div class="complete__actions">'
    + '<button class="btn btn--ghost" type="button" data-repeat>' + icon('repeat', 18) + t('complete.repeat') + '</button>'
    + (deps.hasNext && !deps.training ? '<button class="btn btn--primary" type="button" data-next>' + icon('next', 18) + t('complete.next') + '</button>' : '')
    + '<button class="btn btn--ghost" type="button" data-map>' + t('complete.map') + '</button></div></main>';

  const repeat = qs<HTMLButtonElement>(root, '[data-repeat]');
  repeat.addEventListener('click', deps.onRepeat);
  qs<HTMLButtonElement>(root, '[data-map]').addEventListener('click', deps.onMap);
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  next?.addEventListener('click', deps.onNext);
  (next ?? repeat).focus();
}
`);

w('src/ui/screens/shop.ts', `import { pick, t } from '../../services/i18n';
import { play } from '../../services/audio';
import { addCoins, load, update } from '../../services/save';
import { COSMETICS, colourValue, itemsOf, type CosmeticType } from '../../services/shop';
import { icon } from '../components/icons';
import { owlSvg } from '../components/owl';
import { qs } from '../dom';

const TABS: CosmeticType[] = ['hat', 'colour'];

export function renderShop(root: HTMLElement, onBack: () => void): void {
  let tab: CosmeticType = 'hat';
  const draw = (): void => {
    const save = load();
    const items = itemsOf(tab).map((item) => {
      const owned = save.cosmetics.owned.includes(item.id);
      const equipped = save.cosmetics.equipped[item.tipo] === item.id;
      return '<li class="shop-item"><span class="shop-item__preview" style="background:' + (item.tipo === 'colour' ? item.valor : 'var(--color-surface-raised)') + '"></span>'
        + '<span>' + pick(item.nome) + '</span><span>' + (owned ? (equipped ? t('shop.equipped') : t('shop.own')) : icon('feather', 14) + item.preco) + '</span>'
        + '<button class="btn ' + (owned ? 'btn--ghost' : 'btn--primary') + '" type="button" data-buy="' + item.id + '" ' + (owned && equipped ? 'disabled' : '') + '>'
        + (owned ? t('shop.equip') : t('shop.buy')) + '</button></li>';
    }).join('');

    root.innerHTML = '<main class="screen"><header class="topbar">'
      + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button>'
      + '<span class="chip">' + icon('feather', 16) + save.coins + '</span></header>'
      + '<h1>' + t('shop.title') + '</h1><div class="profile-owl">' + owlSvg(96, save.cosmetics.equipped.hat, colourValue(save.cosmetics.equipped.colour)) + '</div>'
      + '<div class="tabs">' + TABS.map((n) => '<button class="tab ' + (n === tab ? 'is-active' : '') + '" type="button" data-tab="' + n + '">' + t('shop.tab.' + n) + '</button>').join('') + '</div>'
      + '<ul class="shop-list">' + items + '</ul></main>';

    qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', onBack);
    root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((b) => {
      b.addEventListener('click', () => { tab = (b.dataset.tab as CosmeticType) ?? 'hat'; draw(); });
    });
    root.querySelectorAll<HTMLButtonElement>('[data-buy]').forEach((b) => {
      b.addEventListener('click', () => {
        const item = COSMETICS.find((c) => c.id === b.dataset.buy);
        if (!item) return;
        const current = load();
        if (!current.cosmetics.owned.includes(item.id)) {
          if (current.coins < item.preco) return;
          addCoins(-item.preco);
          update((d) => { d.cosmetics.owned.push(item.id); });
        }
        update((d) => { d.cosmetics.equipped[item.tipo] = item.id; });
        play('coin');
        draw();
      });
    });
  };
  draw();
}
`);

w('src/ui/screens/parentZone.ts', `import { t } from '../../services/i18n';
import { load, saveSettings } from '../../services/save';
import { icon } from '../components/icons';
import { qs } from '../dom';

export function renderParentZone(root: HTMLElement, onBack: () => void): void {
  const save = load();
  const a = 17; const b = 4;
  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button></header>'
    + '<h1>' + t('parents.title') + '</h1><div class="card"><p>' + t('parents.gate', { a, b }) + '</p>'
    + '<input class="gate-input" type="number" data-gate /><p data-error hidden>' + t('parents.gateError') + '</p>'
    + '<button class="btn btn--primary" type="button" data-enter>' + t('parents.enter') + '</button></div><div data-report hidden></div></main>';

  const report = qs<HTMLDivElement>(root, '[data-report]');
  const input = qs<HTMLInputElement>(root, '[data-gate]');
  const error = qs<HTMLParagraphElement>(root, '[data-error]');
  qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', onBack);

  qs<HTMLButtonElement>(root, '[data-enter]').addEventListener('click', () => {
    if (Number(input.value) !== a * b) { error.hidden = false; return; }
    const rows = Object.entries(save.stars).map(([id, s]) => '<tr><td>' + id + '</td><td>' + s + '</td></tr>').join('');
    report.hidden = false;
    report.innerHTML = '<h2>' + t('parents.report') + '</h2><table class="report-table"><thead><tr><th>' + t('parents.level') + '</th><th>' + t('parents.stars') + '</th></tr></thead>'
      + '<tbody>' + (rows || '<tr><td colspan="2">' + t('parents.empty') + '</td></tr>') + '</tbody></table>'
      + '<label class="row"><span>' + t('parents.analytics') + '</span><input type="checkbox" data-analytics ' + (save.settings.analyticsConsent ? 'checked' : '') + ' /></label>';
    report.querySelector<HTMLInputElement>('[data-analytics]')?.addEventListener('change', (e) => {
      saveSettings({ analyticsConsent: (e.target as HTMLInputElement).checked });
    });
  });
}
`);

w('src/ui/screens/credits.ts', `import { t } from '../../services/i18n';
import { icon } from '../components/icons';
import { qs } from '../dom';

export function renderCredits(root: HTMLElement, onBack: () => void): void {
  root.innerHTML = '<main class="screen"><header class="topbar">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-back aria-label="' + t('common.back') + '">' + icon('left', 20) + '</button></header>'
    + '<h1>' + t('credits.title') + '</h1><div class="card">'
    + '<h2>' + t('credits.team') + '</h2><p>' + t('credits.teamText') + '</p>'
    + '<h2>' + t('credits.tech') + '</h2><p>' + t('credits.techText') + '</p>'
    + '<h2>' + t('credits.privacy') + '</h2><p>' + t('credits.privacyText') + '</p></div></main>';
  qs<HTMLButtonElement>(root, '[data-back]').addEventListener('click', onBack);
}
`);

w('src/ui/screens/profile.ts', `import { ACHIEVEMENTS } from '../../services/achievements';
import { pick, t } from '../../services/i18n';
import type { SaveData } from '../../services/save';
import { icon } from '../components/icons';
import { owlSvg } from '../components/owl';
import { colourValue } from '../../services/shop';
import { openSheet } from '../components/dialog';

export function openProfile(save: SaveData): void {
  openSheet(t('profile.title'), (body) => {
    const stars = Object.values(save.stars).reduce((a, b) => a + b, 0);
    const stats = document.createElement('ul');
    stats.className = 'stat-list';
    stats.innerHTML = '<li>' + icon('feather', 18) + t('profile.coins', { count: save.coins }) + '</li>'
      + '<li>' + icon('flame', 18) + t('profile.streak', { count: save.streak }) + '</li>'
      + '<li>' + icon('star', 18) + t('profile.stars', { count: stars }) + '</li>';
    const grid = document.createElement('ul');
    grid.className = 'achievement-grid';
    for (const a of ACHIEVEMENTS) {
      const unlocked = save.achievements.includes(a.id);
      const li = document.createElement('li');
      li.className = 'achievement' + (unlocked ? ' is-unlocked' : '');
      li.title = a.condicao;
      li.innerHTML = icon('star', 16) + '<span>' + pick(a.titulo) + '</span>';
      grid.append(li);
    }
    const avatar = document.createElement('div');
    avatar.className = 'profile-owl';
    avatar.innerHTML = owlSvg(90, save.cosmetics.equipped.hat, colourValue(save.cosmetics.equipped.colour));
    body.append(avatar, stats, grid);
  });
}
`);

w('src/ui/screens/settingsSheet.ts', `import type { Settings } from '../../services/save';
import { t } from '../../services/i18n';
import { openSheet } from '../components/dialog';

type BoolKey = 'soundEnabled' | 'musicEnabled' | 'timedMode' | 'buttonsOnly' | 'highContrast' | 'dyslexiaFont' | 'readOnlyMode';

const TOGGLES: ReadonlyArray<[BoolKey, string, boolean]> = [
  ['soundEnabled', 'settings.sound', false],
  ['musicEnabled', 'settings.music', false],
  ['timedMode', 'settings.timed', true],
  ['buttonsOnly', 'settings.buttonsOnly', false],
  ['highContrast', 'settings.highContrast', false],
  ['dyslexiaFont', 'settings.dyslexia', false],
  ['readOnlyMode', 'settings.readOnlyMode', false]
];

export function openSettings(current: Settings, onChange: (c: Partial<Settings>) => void): void {
  openSheet(t('settings.title'), (body) => {
    for (const [key, label, inverted] of TOGGLES) {
      const row = document.createElement('label');
      row.className = 'row';
      const span = document.createElement('span');
      span.textContent = t(label);
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = inverted ? !current[key] : current[key];
      input.addEventListener('change', () => {
        onChange({ [key]: inverted ? !input.checked : input.checked } as Partial<Settings>);
      });
      row.append(span, input);
      body.append(row);
    }
    const scale = document.createElement('label');
    scale.className = 'row';
    const scaleLabel = document.createElement('span');
    scaleLabel.textContent = t('settings.textSize');
    const select = document.createElement('select');
    ['settings.sizeNormal', 'settings.sizeLarge', 'settings.sizeHuge'].forEach((key, i) => {
      const option = document.createElement('option');
      option.value = String(i);
      option.textContent = t(key);
      option.selected = current.fontScale === i;
      select.append(option);
    });
    select.addEventListener('change', () => onChange({ fontScale: Number(select.value) }));
    scale.append(scaleLabel, select);
    body.append(scale);
  });
}
`);

w('src/ui/app.ts', `import type { Level, Question, World, WorldId } from '../content/schema';
import { loadLevelQuestions, loadLevels, loadWorldManifest, loadWorlds } from '../content/worlds';
import { createGame } from '../game/game';
import { applyA11y } from '../services/a11y';
import { evaluate } from '../services/achievements';
import { configure, play } from '../services/audio';
import { buildDaily, isDailyAvailable, markDailyDone } from '../services/daily';
import { computeStars, featherReward, isLevelUnlocked } from '../services/progress';
import { addCoins, load, recordLevelResult, saveSettings, update } from '../services/save';
import { registerPlay } from '../services/streak';
import { setTelemetryConsent, track } from '../services/telemetry';
import { renderComplete } from './screens/complete';
import { renderCredits } from './screens/credits';
import { renderGame } from './screens/game';
import { renderLevelSelect } from './screens/levelSelect';
import { renderParentZone } from './screens/parentZone';
import { renderShop } from './screens/shop';
import { renderWorldMap } from './screens/worldMap';
import { openProfile } from './screens/profile';
import { openSettings } from './screens/settingsSheet';

export function startApp(root: HTMLElement): void {
  let game: ReturnType<typeof createGame> | null = null;

  const dispose = (): void => { game?.destroy(); game = null; };

  const sync = (): void => {
    const s = load().settings;
    applyA11y(s);
    configure(s.soundEnabled, s.musicEnabled);
    setTelemetryConsent(s.analyticsConsent);
  };

  const checkAchievements = (): void => {
    const snap = load();
    const novos = evaluate(snap, {
      totalStars: Object.values(snap.stars).reduce((a, b) => a + b, 0),
      levelsDone: Object.values(snap.stars).filter((v) => v >= 1).length,
      perfectLevels: Object.values(snap.stars).filter((v) => v === 3).length,
      bossWins: snap.bossesWon.length,
      coins: snap.coins
    });
    if (novos.length) {
      update((d) => { d.achievements.push(...novos); });
      play('star');
    }
  };

  const toMap = (): void => {
    dispose();
    void loadWorlds().then(async (worlds) => {
      const byWorld: Record<string, readonly Level[]> = {};
      const all = await Promise.all(worlds.map((w) => loadLevels(w.id)));
      worlds.forEach((w, i) => { byWorld[w.id] = all[i] ?? []; });
      sync();
      renderWorldMap(root, {
        worlds, byWorld, save: load(), dailyAvailable: isDailyAvailable(),
        onWorld: (id) => void toLevels(id),
        onProfile: () => openProfile(load()),
        onShop: () => renderShop(root, toMap),
        onDaily: () => void toDaily(),
        onParents: () => renderParentZone(root, toMap),
        onCredits: () => renderCredits(root, toMap),
        onSettings: () => openSettings(load().settings, (c) => { saveSettings(c); sync(); toMap(); })
      });
    });
  };

  const toLevels = async (worldId: WorldId): Promise<void> => {
    dispose();
    const [world, levels] = await Promise.all([loadWorldManifest(worldId), loadLevels(worldId)]);
    renderLevelSelect(root, {
      world, levels, save: load(), onBack: toMap,
      onPlay: (levelId, training) => void toGame(world, levels, levelId, training)
    });
  };

  const run = async (
    questions: readonly Question[], training: boolean, boss: boolean,
    onExit: () => void, onDone: (correct: number, errors: number) => void
  ): Promise<void> => {
    const s = load().settings;
    dispose();
    renderGame(root, {
      questions, training, boss, timed: s.timedMode,
      buttonsOnly: s.buttonsOnly || s.readOnlyMode, readOnly: s.readOnlyMode,
      mountGame: (arena) => { const h = createGame(arena); game = h; return h; },
      onExit,
      onFinish: (r) => onDone(r.correct, r.errors)
    });
  };

  const toGame = async (world: World, levels: readonly Level[], levelId: string, training: boolean): Promise<void> => {
    if (!isLevelUnlocked(load(), levels, levelId)) return;
    const level = levels.find((l) => l.id === levelId);
    if (!level) return;
    registerPlay();
    track({ name: 'level_start', levelId });
    const questions = await loadLevelQuestions(world.id, levelId);
    const pos = levels.findIndex((l) => l.id === levelId);
    const next = levels[pos + 1];

    await run(questions, training, level.boss, () => void toLevels(world.id), (correct, errors) => {
      const stars = computeStars(errors);
      let feathers = 0;
      if (!training) {
        recordLevelResult(levelId, stars);
        if (level.boss && errors < 3) {
          update((d) => { if (!d.bossesWon.includes(levelId)) d.bossesWon.push(levelId); });
        }
        feathers = featherReward(correct, stars);
        addCoins(feathers);
        checkAchievements();
        track({ name: 'level_complete', levelId, correct, total: questions.length });
      }
      dispose();
      renderComplete(root, {
        stars, feathers, correct, total: questions.length, training, hasNext: Boolean(next),
        onRepeat: () => void toGame(world, levels, levelId, training),
        onNext: () => { if (next) void toGame(world, levels, next.id, false); },
        onMap: () => void toLevels(world.id)
      });
    });
  };

  const toDaily = async (): Promise<void> => {
    if (!isDailyAvailable()) return;
    const ids = await loadWorlds().then((w) => w.map((x) => x.id));
    const questions = await buildDaily(ids);
    if (!questions.length) return;
    await run(questions, false, false, toMap, (correct) => {
      markDailyDone();
      const feathers = correct;
      addCoins(feathers);
      checkAchievements();
      dispose();
      renderComplete(root, {
        stars: computeStars(questions.length - correct), feathers, correct, total: questions.length,
        training: false, hasNext: false,
        onRepeat: () => void toDaily(), onNext: toMap, onMap: toMap
      });
    });
  };

  sync();
  track({ name: 'app_open' });
  toMap();
}
`);

console.log('Bloco 7 concluido: todos os ecras e o router criados.');

