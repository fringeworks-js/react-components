import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { NwrSpanProps } from '../../primitives/NwrSpan';

/**
 * プロパティ
 */
export type NwrInlineProps = WithPartsProps<{
  root: NwrSpanProps;
}> &
  Pick<NwrSpanProps, 'className' | 'style' | 'children'>;
