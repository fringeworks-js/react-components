import NwrBox from '../../base/NwrBox';
import withResizable from '../../hocs/withResizable';
import type { NwrResizableContainerProps } from './types';

const NwrResizableContainer = withResizable<
  NwrResizableContainerProps,
  HTMLDivElement
>(NwrBox);
NwrResizableContainer.displayName = 'NwrResizableContainer';
export default NwrResizableContainer;
