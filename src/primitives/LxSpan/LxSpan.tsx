import { forwardRef } from 'react';
import type { LxSpanProps } from './types';

const LxSpan = forwardRef<HTMLSpanElement, LxSpanProps>((props, ref) => {
  return <span ref={ref} {...props} />;
});
LxSpan.displayName = 'LxSpan';
export default LxSpan;
