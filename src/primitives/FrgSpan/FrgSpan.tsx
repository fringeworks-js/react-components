import { forwardRef } from 'react';
import type { FrgSpanProps } from './types';

const FrgSpan = forwardRef<HTMLSpanElement, FrgSpanProps>((props, ref) => {
  return <span ref={ref} {...props} />;
});
FrgSpan.displayName = 'FrgSpan';
export default FrgSpan;
