import type {
  UseDeferUntilWebFontReadyOptions,
  WebFontTargets,
} from '@fringeworks/react-defer-rendering/useDeferUntilWebFontReady';
import type { PropsWithChildren } from 'react';

/**
 * プロパティ
 */
export type FrgWebFontBoundaryProps =
  PropsWithChildren<FrgWebFontBoundaryOwnProps>;

/**
 * 固有のプロパティ
 */
export type FrgWebFontBoundaryOwnProps = UseDeferUntilWebFontReadyOptions & {
  /**
   * フォント
   */
  fonts: WebFontTargets;
};
