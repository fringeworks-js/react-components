import type { UseDeferUntilFontReadyOptions } from '@niche-works/react-defer-rendering/useDeferUntilFontReady';
import type { PropsWithChildren } from 'react';

/**
 * プロパティ
 */
export type LxFontBoundaryProps = PropsWithChildren<LxFontBoundaryOwnProps>;

/**
 * 固有のプロパティ
 */
export type LxFontBoundaryOwnProps = UseDeferUntilFontReadyOptions & {
  /**
   * フォントファミリー
   */
  fontFamily: string;
};
