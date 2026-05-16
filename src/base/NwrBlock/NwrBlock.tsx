import { extractPartProps } from '@niche-works/react-parts-props';
import { forwardRef } from 'react';
import withStyleProps from '../../hocs/withStyleProps';
import type { NwrDivProps } from '../../primitives/NwrDiv';
import NwrDiv from '../../primitives/NwrDiv';
import type { NwrBlockProps } from './types';

const StylableDiv = withStyleProps<NwrDivProps, HTMLDivElement>(NwrDiv);

/**
 * スタイル関連の拡張を含んだdiv
 */
const NwrBlock = forwardRef<HTMLDivElement, NwrBlockProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const divProps = extractPartProps('root', partsProps);
  return <StylableDiv ref={ref} {...rest} {...divProps} />;
});
NwrBlock.displayName = 'NwrBlock';
export default NwrBlock;
