import type { WithPartsProps } from '@fringeworks/react-parts-props';
import type { StyleProps } from '@fringeworks/react-style-props';
import type { FrgSpanProps } from '../../primitives/FrgSpan';

/**
 * プロパティ
 */
export type FrgInlineProps = WithPartsProps<{
  root: FrgSpanProps;
}> &
  Pick<FrgSpanProps, 'className' | 'style' | 'children'> &
  StyleProps;
