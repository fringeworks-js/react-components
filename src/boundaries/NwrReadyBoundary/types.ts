import type { RenderingState } from '@niche-works/react-defer-rendering';
import type { UseDeferUntilReadyOptions } from '@niche-works/react-defer-rendering/useDeferUntilReady';
import type { PropsWithChildren } from 'react';

/**
 * プロパティ
 */
export type NwrReadyBoundaryProps = PropsWithChildren<NwrReadyBoundaryOwnProps>;

/**
 * 固有のプロパティ
 */
export type NwrReadyBoundaryOwnProps = UseDeferUntilReadyOptions & {
  /**
   * 状態
   */
  state: RenderingState;
};
