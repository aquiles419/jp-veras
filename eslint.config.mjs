import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**'],
  },
];

export default config;
