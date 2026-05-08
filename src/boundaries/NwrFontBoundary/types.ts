import type { UseDeferUntilFontReadyOptions } from '@niche-works/react-defer-rendering/useDeferUntilFontReady';
import type { PropsWithChildren } from 'react';

/**
 * プロパティ
 */
export type NwrFontBoundaryProps = PropsWithChildren<NwrFontBoundaryOwnProps>;

/**
 * 固有のプロパティ
 */
export type NwrFontBoundaryOwnProps = UseDeferUntilFontReadyOptions & {
  /**
   * フォントファミリー
   */
  fontFamily: string;
};
