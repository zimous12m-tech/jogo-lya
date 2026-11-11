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