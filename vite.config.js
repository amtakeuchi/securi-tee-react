import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        success: resolve(__dirname, 'public/success.html'),
      },
    },
    copyPublicDir: true,
    assetsDir: 'assets',
  },
  server: {
    historyApiFallback: true,
  },
});
