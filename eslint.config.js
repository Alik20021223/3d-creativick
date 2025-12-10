// import js from '@eslint/js';
// import globals from 'globals';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// import tseslint from 'typescript-eslint';
// import prettier from 'eslint-plugin-prettier';

// export default tseslint.config(
//   { ignores: ['dist', 'node_modules'] },
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     files: ['**/*.{ts,tsx}'],
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//       prettier,
//     },
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     rules: {
//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'warn',
//       'react-refresh/only-export-components': 'off',
//       'prettier/prettier': 'error',
//       '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
//       '@typescript-eslint/no-explicit-any': 'warn',
//       '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//     },
//   },
// );
