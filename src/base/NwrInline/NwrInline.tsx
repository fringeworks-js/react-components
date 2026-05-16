import { extractPartProps } from '@niche-works/react-parts-props';
import { forwardRef } from 'react';
import withStyleProps from '../../hocs/withStyleProps';
import type { NwrSpanProps } from '../../primitives/NwrSpan';
import NwrSpan from '../../primitives/NwrSpan';
import type { NwrInlineProps } from './types';

const StylableSpan = withStyleProps<NwrSpanProps, HTMLSpanElement>(NwrSpan);

/**
 * スタイル関連の拡張を含んだspan
 */
const NwrInline = forwardRef<HTMLSpanElement, NwrInlineProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const spanProps = extractPartProps('root', partsProps);
  return <StylableSpan ref={ref} {...rest} {...spanProps} />;
});
NwrInline.displayName = 'NwrInline';
export default NwrInline;
