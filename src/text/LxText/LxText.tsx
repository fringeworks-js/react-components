import distribute from '@niche-works/utils/object/distribute';
import { forwardRef } from 'react';
import LxInline from '../../base/LxInline';
import LxWebFontBoundary from '../../boundaries/LxWebFontBoundary';
import { LX_WEB_FONT_BOUNDARY_PROP_KEYS } from '../../boundaries/LxWebFontBoundary/constants';
import type { LxTextProps } from './types';

/**
 * 文字列を表示します
 */
const LxText = forwardRef<HTMLSpanElement, LxTextProps>((props, ref) => {
  const { boundaryProps, inlineProps } = distribute(props, {
    boundaryProps: LX_WEB_FONT_BOUNDARY_PROP_KEYS,
    inlineProps: null,
  });
  const { fonts, ...restBoundaryProps } = boundaryProps;
  const { value, ...restInlineProps } = inlineProps;

  return (
    <LxWebFontBoundary fonts={fonts} {...restBoundaryProps}>
      <LxInline ref={ref} {...restInlineProps}>
        {value}
      </LxInline>
    </LxWebFontBoundary>
  );
});
LxText.displayName = 'LxText';
export default LxText;
