import { forwardRef } from 'react';
import type { LxDivProps } from './types';

const LxDiv = forwardRef<HTMLDivElement, LxDivProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});
LxDiv.displayName = 'LxDiv';
export default LxDiv;
