import { extractPartProps } from '@niche-works/react-parts-props';
import { forwardRef } from 'react';
import withStyleProps from '../../hocs/withStyleProps';
import type { NwrDivProps } from '../../primitives/NwrDiv';
import NwrDiv from '../../primitives/NwrDiv';
import type { NwrBoxProps } from './types';

const StylableDiv = withStyleProps<NwrDivProps, HTMLDivElement>(NwrDiv);

/**
 * スタイル関連の拡張を含んだdiv
 */
const NwrBox = forwardRef<HTMLDivElement, NwrBoxProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const divProps = extractPartProps('root', partsProps);
  return <StylableDiv ref={ref} {...rest} {...divProps} />;
});
NwrBox.displayName = 'NwrBox';
export default NwrBox;
