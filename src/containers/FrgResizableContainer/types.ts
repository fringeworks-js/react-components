import type { FrgBlockProps } from '../../base/FrgBlock';
import type { WithResizableProps } from '../../hocs/withResizable';

/**
 * プロパティ
 */
export type FrgResizableContainerProps = FrgResizableContainerDivOwnProps &
  WithResizableProps;

export type FrgResizableContainerDivOwnProps = FrgBlockProps;
