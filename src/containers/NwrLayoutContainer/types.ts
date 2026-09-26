import { LayoutType } from '@niche-works/react-layout/constants';
import type { NwrBalanceLayoutContainerProps } from '../NwrBalanceLayoutContainer/types';
import type { NwrFlowLayoutContainerProps } from '../NwrFlowLayoutContainer/types';
import type { NwrMatrixLayoutContainerProps } from '../NwrMatrixLayoutContainer/types';
import type { NwrPackLayoutContainerProps } from '../NwrPackLayoutContainer/types';
import type { NwrPinLayoutContainerProps } from '../NwrPinLayoutContainer/types';
import type { NwrStackLayoutContainerProps } from '../NwrStackLayoutContainer/types';
import type { NwrTileLayoutContainerProps } from '../NwrTileLayoutContainer/types';

export type NwrLayoutContainerProps =
  | ({ layout: typeof LayoutType.balance } & NwrBalanceLayoutContainerProps)
  | ({ layout: typeof LayoutType.flow } & NwrFlowLayoutContainerProps)
  | ({ layout: typeof LayoutType.matrix } & NwrMatrixLayoutContainerProps)
  | ({ layout: typeof LayoutType.pack } & NwrPackLayoutContainerProps)
  | ({ layout: typeof LayoutType.pin } & NwrPinLayoutContainerProps)
  | ({ layout: typeof LayoutType.stack } & NwrStackLayoutContainerProps)
  | ({ layout: typeof LayoutType.tile } & NwrTileLayoutContainerProps);
