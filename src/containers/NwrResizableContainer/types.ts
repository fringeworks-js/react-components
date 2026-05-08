import type { NwrBoxProps } from '../../base/NwrBox';
import type { WidthResizableProps } from '../../hocs/withResizable';

/**
 * プロパティ
 */
export type NwrResizableContainerProps = NwrResizableContainerDivOwnProps &
  WidthResizableProps;

export type NwrResizableContainerDivOwnProps = NwrBoxProps;
