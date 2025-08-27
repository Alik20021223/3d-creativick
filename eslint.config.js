import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

// 👇 добавь это
import prettier from 'eslint-plugin-prettier'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    // 👇 плагин обязателен, если используешь 'prettier/prettier'
    plugins: { prettier },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      // 👇 можно (и лучше) добавить в конец
      prettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
])
