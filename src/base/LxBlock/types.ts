import type { WithPartsProps } from '@fringeworks/react-parts-props';
import type { StyleProps } from '@fringeworks/react-style-props';
import type { LxDivProps } from '../../primitives/LxDiv';

/**
 * プロパティ
 */
export type LxBlockProps = WithPartsProps<{
  root: LxDivProps;
}> &
  Pick<LxDivProps, 'className' | 'style' | 'children'> &
  StyleProps;
