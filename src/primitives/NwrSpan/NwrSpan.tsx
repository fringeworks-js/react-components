import { forwardRef } from 'react';
import type { NwrSpanProps } from './types';

const NwrSpan = forwardRef<HTMLSpanElement, NwrSpanProps>((props, ref) => {
  return <span ref={ref} {...props} />;
});
NwrSpan.displayName = 'NwrSpan';
export default NwrSpan;
