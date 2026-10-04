import distribute from '@fringeworks/utils/object/distribute';
import { forwardRef } from 'react';
import FrgInline from '../../base/FrgInline';
import FrgWebFontBoundary from '../../boundaries/FrgWebFontBoundary';
import { LX_WEB_FONT_BOUNDARY_PROP_KEYS } from '../../boundaries/FrgWebFontBoundary/constants';
import type { FrgTextProps } from './types';

/**
 * 文字列を表示します
 */
const FrgText = forwardRef<HTMLSpanElement, FrgTextProps>((props, ref) => {
  const { boundaryProps, inlineProps } = distribute(props, {
    boundaryProps: LX_WEB_FONT_BOUNDARY_PROP_KEYS,
    inlineProps: null,
  });
  const { fonts, ...restBoundaryProps } = boundaryProps;
  const { value, ...restInlineProps } = inlineProps;

  return (
    <FrgWebFontBoundary fonts={fonts} {...restBoundaryProps}>
      <FrgInline ref={ref} {...restInlineProps}>
        {value}
      </FrgInline>
    </FrgWebFontBoundary>
  );
});
FrgText.displayName = 'FrgText';
export default FrgText;
