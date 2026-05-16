import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { StyleProps } from '@niche-works/react-style-props';
import type { NwrSpanProps } from '../../primitives/NwrSpan';

/**
 * プロパティ
 */
export type NwrInlineProps = StyleProps &
  WithPartsProps<{
    root: NwrSpanProps;
  }> &
  Pick<NwrSpanProps, 'className' | 'style' | 'children'>;
