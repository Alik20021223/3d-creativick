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
    base: '/3d-creativick/',
  };
});
