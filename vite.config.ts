import { defineConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';
import path from 'node:path';

console.log('dirname', __dirname);

// https://vite.dev/config/
export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
      ],
    },
  },
});
