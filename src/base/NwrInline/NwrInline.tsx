import { extractPartProps } from '@niche-works/react-parts-props';
import { forwardRef } from 'react';
import NwrSpan from '../../primitives/NwrSpan';
import type { NwrInlineProps } from './types';

const NwrInline = forwardRef<HTMLSpanElement, NwrInlineProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const spanProps = extractPartProps('root', partsProps);
  return <NwrSpan ref={ref} {...rest} {...spanProps} />;
});
NwrInline.displayName = 'NwrInline';
export default NwrInline;
