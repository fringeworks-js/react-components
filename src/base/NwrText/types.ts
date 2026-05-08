import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { StyleProps } from '@niche-works/react-style-props';
import type { NwrSpanProps } from '../../primitives/NwrSpan';

/**
 * プロパティ
 */
export type NwrTextProps = NwrTextOwnProps &
  StyleProps &
  WithPartsProps<{
    root: NwrSpanProps;
  }>;

/**
 * 固有のプロパティ
 */
export type NwrTextOwnProps = {};
