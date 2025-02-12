import globals from 'globals';
import pluginJs from '@eslint/js';
import tslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tslint.configs.recommended,
  ...tslint.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
