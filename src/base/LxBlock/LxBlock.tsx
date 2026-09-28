import mergePartProps from '@niche-works/react-parts-props/mergePartProps';
import applyStyleProps from '@niche-works/react-style-props/applyStyleProps';
import { forwardRef } from 'react';
import LxDiv from '../../primitives/LxDiv';
import type { LxBlockProps } from './types';

const LxBlock = forwardRef<HTMLDivElement, LxBlockProps>((props, ref) => {
  const { partsProps, ...rest } = props;
  const applyedProps = applyStyleProps(rest);
  const divProps = mergePartProps(applyedProps, partsProps?.root);
  return <LxDiv ref={ref} {...rest} {...divProps} />;
});
LxBlock.displayName = 'LxBlock';
export default LxBlock;
