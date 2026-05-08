import { useDeferUntilReady } from '@niche-works/react-defer-rendering';
import type { FC } from 'react';
import type { NwrReadyBoundaryProps } from './types';

const NwrReadyBoundary: FC<NwrReadyBoundaryProps> = (
  props: NwrReadyBoundaryProps,
) => {
  const { state, children, ...rest } = props;
  const { node } = useDeferUntilReady(children, state, rest);
  return node ?? <></>;
};
NwrReadyBoundary.displayName = 'NwrReadyBoundary';
export default NwrReadyBoundary;
