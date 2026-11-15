import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import path from 'node:path';

// アイコンのストーリーで使う material-symbols（react-icon-material-symbols のフォントの読み込みの入口が参照する）の場所。
// ワークスペースのルートの node_modules にあり、Storybook がファイルを配れる範囲（server.fs.allow）の外になるため、範囲に足す。
// react-icon-material-symbols は、ルートの overrides でワークスペースの中のパッケージにつないでいる
const materialSymbolsDir = path.dirname(
  createRequire(
    path.resolve(
      import.meta.dirname,
      '../../react-icon-material-symbols/package.json',
    ),
  ).resolve('material-symbols/package.json'),
);

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    server: {
      ...viteConfig.server,
      fs: {
        ...viteConfig.server?.fs,
        allow: [...(viteConfig.server?.fs?.allow ?? []), materialSymbolsDir],
      },
    },
  }),
};
export default config;
