import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    // keep every image and film as its own file, never inlined into the JS
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
  },
});
