import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // MUDANÇA AQUI: Aponta para o nome do repositório no GitHub
  base: '/jogo-lya/', 
  
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