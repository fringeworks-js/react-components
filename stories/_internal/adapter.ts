/**
 * `_shared`とlayoutごとのstoryが参照する、パッケージ固有の依存
 *
 * `_shared`とlayoutごとのstoryはパッケージ間でそのままコピーして使うため、
 * パッケージによって参照先が異なるものはこのファイルに集約する。
 */
export {
  Adjust,
  AlignX,
  AlignXBase,
  AlignY,
  AlignYBase,
  Direction,
} from '@fringeworks/react-layouts/constants';
export type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
