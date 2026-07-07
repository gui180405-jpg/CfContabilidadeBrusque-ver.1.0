import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite puro: sem plugin proprietário, sem Base44, sem SDK externo.
// A Vercel reconhece esse arquivo automaticamente como projeto Vite.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
