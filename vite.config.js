import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5172, // Порт, который вы используете
    strictPort: true, // Если порт занят, сервер не переключится на другой
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Упрощённый импорт для удобства
    },
  },
});
