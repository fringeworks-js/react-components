import mergePartProps from '@fringeworks/react-parts-props/mergePartProps';
import applyStyleProps from '@fringeworks/react-style-props/applyStyleProps';
import { forwardRef } from 'react';
import FrgSpan from '../../primitives/FrgSpan';
import type { FrgInlineProps } from './types';

const FrgInline = forwardRef<HTMLSpanElement, FrgInlineProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const applyedProps = applyStyleProps(rest);
  const spanProps = mergePartProps(applyedProps, partsProps?.root);
  return <FrgSpan ref={ref} {...rest} {...spanProps} />;
});
FrgInline.displayName = 'FrgInline';
export default FrgInline;
