import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
    rules: {
      'react/prop-types': 'off',
    },
  },
  pluginReact.configs.flat.recommended,
]);
