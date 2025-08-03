import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['build', '.react-router']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest']
    ],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser
    },
    rules: {
      'no-empty-pattern': 'off'
    }
  },
  {
    files: ['server/**'],
    languageOptions: {
      globals: {
        browser: false,
        node: true
      }
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'off'
    }
  }
]);
