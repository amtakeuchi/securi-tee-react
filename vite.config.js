import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      jsxImportSource: 'react',
      include: "**/*.{jsx,tsx}",
      exclude: ["**/node_modules/**"],
      babel: {
        presets: [
          ['@babel/preset-react', { runtime: 'classic' }]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'app': ['/src/main.jsx']
        }
      }
    },
    minify: false,
    sourcemap: true
  },
  server: {
    historyApiFallback: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true
  },
  publicDir: 'public',
  base: '/'
});
