import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cfBlog from './scripts/vite-plugin-cf-blog.js';

// Vite puro: sem plugin proprietário, sem Base44, sem SDK externo.
// A Vercel reconhece esse arquivo automaticamente como projeto Vite.
//
// cfBlog: lê os artigos de src/content/posts (gravados pelo painel /admin),
// publica só os artigos liberados e gera meta tags, redirecionamentos e sitemap.
export default defineConfig({
  plugins: [
    react(),
    cfBlog({
      postsDir: 'src/content/posts',
      siteUrl: 'https://cfcontabilidadebrusque.com',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
