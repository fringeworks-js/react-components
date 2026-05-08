import type { Config } from 'prettier';
import base from './prettier.config.ts';

const config: Config = {
  ...base,
  organizeImportsSkipDestructiveCodeActions: false,
};

export default config;
