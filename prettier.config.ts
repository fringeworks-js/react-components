import type { Config } from 'prettier';

const config: Config = {
  arrowParens: 'always',
  semi: true,
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  endOfLine: 'auto',
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-packagejson'],
};
export default config;
