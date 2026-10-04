import mergePartProps from '@fringeworks/react-parts-props/mergePartProps';
import applyStyleProps from '@fringeworks/react-style-props/applyStyleProps';
import { forwardRef } from 'react';
import FrgDiv from '../../primitives/FrgDiv';
import type { FrgBlockProps } from './types';

const FrgBlock = forwardRef<HTMLDivElement, FrgBlockProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const applyedProps = applyStyleProps(rest);
  const divProps = mergePartProps(applyedProps, partsProps?.root);
  return <FrgDiv ref={ref} {...rest} {...divProps} />;
});
FrgBlock.displayName = 'FrgBlock';
export default FrgBlock;
