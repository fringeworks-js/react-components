import { forwardRef } from 'react';
import type { NwrDivProps } from './types';

const NwrDiv = forwardRef<HTMLDivElement, NwrDivProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});
NwrDiv.displayName = 'NwrDiv';
export default NwrDiv;
