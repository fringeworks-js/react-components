import type { WithPartsProps } from '@fringeworks/react-parts-props';
import type { StyleProps } from '@fringeworks/react-style-props';
import type { FrgDivProps } from '../../primitives/FrgDiv';

/**
 * プロパティ
 */
export type FrgBlockProps = WithPartsProps<{
  root: FrgDivProps;
}> &
  Pick<FrgDivProps, 'className' | 'style' | 'children'> &
  StyleProps;
