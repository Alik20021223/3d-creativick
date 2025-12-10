// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [
      react(),
      tailwindcss(),
      // только в dev, никаких проверок на build
      ...(isDev
        ? [
            checker({
              typescript: { tsconfigPath: './tsconfig.app.json' },
              eslint: { lintCommand: 'eslint .', useFlatConfig: true },
              overlay: { initialIsOpen: true, position: 'br' },
              enableBuild: false,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@app': path.resolve(__dirname, 'src/app'),
        '@assets': path.resolve(__dirname, 'src/app/assets'),
        '@shadcn': path.resolve(__dirname, 'src/shared/shadcn'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@lib': path.resolve(__dirname, 'src/shared/lib'),
        '@feature': path.resolve(__dirname, 'src/feature'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@widgets': path.resolve(__dirname, 'src/widgets'),
        '@entities': path.resolve(__dirname, 'src/entities'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Разделяем vendor библиотеки на отдельные чанки
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
              '@radix-ui/react-tabs',
              '@radix-ui/react-tooltip',
            ],
            'query-vendor': ['@tanstack/react-query'],
            'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
            'swiper-vendor': ['swiper'],
          },
        },
      },
      // Увеличиваем лимит предупреждений для больших чанков
      chunkSizeWarningLimit: 1000,
      // Включаем source maps только для production (опционально)
      sourcemap: false,
      // Минификация
      minify: 'esbuild',
    },
    // Оптимизация зависимостей
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'https://api.3dkreativik.store',
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },
  };
});
