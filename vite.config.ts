import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupVitest.ts',
    coverage: {
      provider: 'c8',
    }
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
