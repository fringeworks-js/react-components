import useDeferUntilReady from '@fringeworks/react-defer-rendering/useDeferUntilReady';
import type { FC } from 'react';
import type { FrgReadyBoundaryProps } from './types';

const FrgReadyBoundary: FC<FrgReadyBoundaryProps> = (
  props: FrgReadyBoundaryProps,
) => {
  const { state, children, ...rest } = props;
  const { node } = useDeferUntilReady(children, state, rest);
  return node;
};
FrgReadyBoundary.displayName = 'FrgReadyBoundary';
export default FrgReadyBoundary;
