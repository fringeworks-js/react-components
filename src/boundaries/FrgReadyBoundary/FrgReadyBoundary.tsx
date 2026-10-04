import useDeferUntilReady from '@fringeworks/react-defer-rendering/useDeferUntilReady';
import applyDefaultProps from '@fringeworks/react-utils/utils/applyDefaultProps';
import type { FC } from 'react';
import type { FrgReadyBoundaryProps } from './types';

const FrgReadyBoundary: FC<FrgReadyBoundaryProps> = (
  props: FrgReadyBoundaryProps,
) => {
  const { state, children, ...rest } = applyDefaultProps(props, {
    children: <></>,
    pending: <></>,
    fallback: <></>,
  });
  const { node } = useDeferUntilReady(children, state, rest);
  return node;
};
FrgReadyBoundary.displayName = 'FrgReadyBoundary';
export default FrgReadyBoundary;
