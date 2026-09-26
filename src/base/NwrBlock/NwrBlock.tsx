import { extractPartProps } from '@niche-works/react-parts-props';
import { forwardRef } from 'react';
import NwrDiv from '../../primitives/NwrDiv';
import type { NwrBlockProps } from './types';

const NwrBlock = forwardRef<HTMLDivElement, NwrBlockProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const divProps = extractPartProps('root', partsProps);
  return <NwrDiv ref={ref} {...rest} {...divProps} />;
});
NwrBlock.displayName = 'NwrBlock';
export default NwrBlock;
