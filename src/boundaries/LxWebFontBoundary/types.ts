import type {
  UseDeferUntilWebFontReadyOptions,
  WebFontTargets,
} from '@niche-works/react-defer-rendering/useDeferUntilWebFontReady';
import type { PropsWithChildren } from 'react';

/**
 * プロパティ
 */
export type LxWebFontBoundaryProps =
  PropsWithChildren<LxWebFontBoundaryOwnProps>;

/**
 * 固有のプロパティ
 */
export type LxWebFontBoundaryOwnProps = UseDeferUntilWebFontReadyOptions & {
  /**
   * フォント
   */
  fonts: WebFontTargets;
};
