import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { StyleProps } from '@niche-works/react-style-props';
import type { LxDivProps } from '../../primitives/LxDiv';

/**
 * プロパティ
 */
export type LxBlockProps = WithPartsProps<{
  root: LxDivProps;
}> &
  Pick<LxDivProps, 'className' | 'style' | 'children'> &
  StyleProps;
