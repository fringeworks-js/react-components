import type { WithPartsProps } from '@niche-works/react-parts-props';
import type { NwrDivProps } from '../../primitives/NwrDiv';

/**
 * プロパティ
 */
export type NwrBlockProps = WithPartsProps<{
  root: NwrDivProps;
}> &
  Pick<NwrDivProps, 'className' | 'style' | 'children'>;
