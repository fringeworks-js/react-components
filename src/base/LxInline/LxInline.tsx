import mergePartProps from '@niche-works/react-parts-props/mergePartProps';
import applyStyleProps from '@niche-works/react-style-props/applyStyleProps';
import { forwardRef } from 'react';
import LxSpan from '../../primitives/LxSpan';
import type { LxInlineProps } from './types';

const LxInline = forwardRef<HTMLSpanElement, LxInlineProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const applyedProps = applyStyleProps(rest);
  const spanProps = mergePartProps(applyedProps, partsProps?.root);
  return <LxSpan ref={ref} {...rest} {...spanProps} />;
});
LxInline.displayName = 'LxInline';
export default LxInline;
