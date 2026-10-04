import type { WithPartsProps } from '@fringeworks/react-parts-props';
import type { StyleProps } from '@fringeworks/react-style-props';
import type { LxSpanProps } from '../../primitives/LxSpan';

/**
 * プロパティ
 */
export type LxInlineProps = WithPartsProps<{
  root: LxSpanProps;
}> &
  Pick<LxSpanProps, 'className' | 'style' | 'children'> &
  StyleProps;
