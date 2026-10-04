import type { RenderingState } from '@fringeworks/react-defer-rendering';
import type { UseDeferUntilReadyOptions } from '@fringeworks/react-defer-rendering/useDeferUntilReady';
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
