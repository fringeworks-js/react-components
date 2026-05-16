import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { StyleProps } from '@niche-works/react-style-props';
import type { NwrDivProps } from '../../primitives/NwrDiv';

/**
 * プロパティ
 */
export type NwrBlockProps = StyleProps &
  WithPartsProps<{
    root: NwrDivProps;
  }> &
  Pick<NwrDivProps, 'className' | 'style' | 'children'>;
