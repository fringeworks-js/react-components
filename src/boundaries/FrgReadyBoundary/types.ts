import type { RenderingState } from '@fringeworks/react-defer-rendering';
import type { UseDeferUntilReadyOptions } from '@fringeworks/react-defer-rendering/useDeferUntilReady';
import type { PropsWithChildren } from 'react';

/**
 * プロパティ
 */
export type FrgReadyBoundaryProps = PropsWithChildren<FrgReadyBoundaryOwnProps>;

/**
 * 固有のプロパティ
 */
export type FrgReadyBoundaryOwnProps = UseDeferUntilReadyOptions & {
  /**
   * 状態
   */
  state: RenderingState;
};
