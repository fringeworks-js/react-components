import useDeferUntilReady from '@fringeworks/react-defer-rendering/useDeferUntilReady';
import applyDefaultProps from '@fringeworks/react-utils/utils/applyDefaultProps';
import type { FC } from 'react';
import type { LxReadyBoundaryProps } from './types';

const LxReadyBoundary: FC<LxReadyBoundaryProps> = (
  props: LxReadyBoundaryProps,
) => {
  const { state, children, ...rest } = applyDefaultProps(props, {
    children: <></>,
    pending: <></>,
    fallback: <></>,
  });
  const { node } = useDeferUntilReady(children, state, rest);
  return node;
};
LxReadyBoundary.displayName = 'LxReadyBoundary';
export default LxReadyBoundary;
