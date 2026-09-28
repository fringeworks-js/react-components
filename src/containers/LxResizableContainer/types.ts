import type { LxBlockProps } from '../../base/LxBlock';
import type { WithResizableProps } from '../../hocs/withResizable';

/**
 * プロパティ
 */
export type LxResizableContainerProps = LxResizableContainerDivOwnProps &
  WithResizableProps;

export type LxResizableContainerDivOwnProps = LxBlockProps;
