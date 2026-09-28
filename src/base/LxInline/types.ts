import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { StyleProps } from '@niche-works/react-style-props';
import type { LxSpanProps } from '../../primitives/LxSpan';

/**
 * プロパティ
 */
export type LxInlineProps = WithPartsProps<{
  root: LxSpanProps;
}> &
  Pick<LxSpanProps, 'className' | 'style' | 'children'> &
  StyleProps;
