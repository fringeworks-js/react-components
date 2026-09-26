import { LayoutType } from '@niche-works/react-layout/constants';
import { forwardRef, type ComponentType } from 'react';
import NwrBalanceLayoutContainer from '../NwrBalanceLayoutContainer/NwrBalanceLayoutContainer';
import NwrFlowLayoutContainer from '../NwrFlowLayoutContainer/NwrFlowLayoutContainer';
import NwrMatrixLayoutContainer from '../NwrMatrixLayoutContainer/NwrMatrixLayoutContainer';
import NwrPackLayoutContainer from '../NwrPackLayoutContainer/NwrPackLayoutContainer';
import NwrPinLayoutContainer from '../NwrPinLayoutContainer/NwrPinLayoutContainer';
import NwrStackLayoutContainer from '../NwrStackLayoutContainer/NwrStackLayoutContainer';
import NwrTileLayoutContainer from '../NwrTileLayoutContainer/NwrTileLayoutContainer';
import type { NwrLayoutContainerProps } from './types';

const Components: Record<string, ComponentType<any>> = {
  [LayoutType.balance]: NwrBalanceLayoutContainer,
  [LayoutType.flow]: NwrFlowLayoutContainer,
  [LayoutType.matrix]: NwrMatrixLayoutContainer,
  [LayoutType.pack]: NwrPackLayoutContainer,
  [LayoutType.pin]: NwrPinLayoutContainer,
  [LayoutType.stack]: NwrStackLayoutContainer,
  [LayoutType.tile]: NwrTileLayoutContainer,
} as const;

const NwrLayoutContainer = forwardRef<HTMLDivElement, NwrLayoutContainerProps>(
  (props, ref) => {
    const { layout, ...rest } = props;
    const Component = Components[layout];
    return <Component ref={ref} {...rest} />;
  },
);
export default NwrLayoutContainer;
