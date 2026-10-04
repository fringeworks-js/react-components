import { forwardRef } from 'react';
import type { FrgDivProps } from './types';

const FrgDiv = forwardRef<HTMLDivElement, FrgDivProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});
FrgDiv.displayName = 'FrgDiv';
export default FrgDiv;
