import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { StyleProps } from '@niche-works/react-style-props';
import type { NwrDivProps } from '../../primitives/NwrDiv';

/**
 * プロパティ
 */
export type NwrBoxProps = NwrBoxOwnProps &
  StyleProps &
  WithPartsProps<{
    root: NwrDivProps;
  }>;

/**
 * 固有のプロパティ
 */
export type NwrBoxOwnProps = {};
