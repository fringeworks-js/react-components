import type { RenderingState } from '@niche-works/react-defer-rendering';
import type { UseDeferUntilReadyOptions } from '@niche-works/react-defer-rendering/useDeferUntilReady';
import type { PropsWithChildren } from 'react';

/**
 * プロパティ
 */
export type LxReadyBoundaryProps = PropsWithChildren<LxReadyBoundaryOwnProps>;

/**
 * 固有のプロパティ
 */
export type LxReadyBoundaryOwnProps = UseDeferUntilReadyOptions & {
  /**
   * 状態
   */
  state: RenderingState;
};
