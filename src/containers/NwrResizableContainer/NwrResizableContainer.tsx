import NwrBlock from '../../base/NwrBlock';
import withResizable from '../../hocs/withResizable';
import type { NwrResizableContainerProps } from './types';

const NwrResizableContainer = withResizable<
  NwrResizableContainerProps,
  HTMLDivElement
>(NwrBlock);
NwrResizableContainer.displayName = 'NwrResizableContainer';
export default NwrResizableContainer;
