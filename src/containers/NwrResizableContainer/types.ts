import type { NwrBlockProps } from '../../base/NwrBlock';
import type { WithResizableProps } from '../../hocs/withResizable';

/**
 * プロパティ
 */
export type NwrResizableContainerProps = NwrResizableContainerDivOwnProps &
  WithResizableProps;

export type NwrResizableContainerDivOwnProps = NwrBlockProps;
