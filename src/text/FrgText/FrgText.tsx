import distribute from '@fringeworks/utils/object/distribute';
import { forwardRef } from 'react';
import { FRG_WEB_FONT_BOUNDARY_PROP_KEYS } from '../../_internal/constants';
import FrgInline from '../../base/FrgInline';
import FrgWebFontBoundary from '../../boundaries/FrgWebFontBoundary';
import type { FrgTextProps } from './types';

/**
 * 文字列を表示します
 *
 * - Webフォントを読み込めなかった場合は、`fallback`を指定しなければ文字列をそのまま表示する
 */
const FrgText = forwardRef<HTMLSpanElement, FrgTextProps>((props, ref) => {
  const { boundaryProps, inlineProps } = distribute(props, {
    boundaryProps: FRG_WEB_FONT_BOUNDARY_PROP_KEYS,
    inlineProps: null,
  });
  const { fonts, fallback, ...restBoundaryProps } = boundaryProps;
  const { value, ...restInlineProps } = inlineProps;
  const text = (
    <FrgInline ref={ref} {...restInlineProps}>
      {value}
    </FrgInline>
  );

  return (
    <FrgWebFontBoundary
      fonts={fonts}
      fallback={fallback ?? text}
      {...restBoundaryProps}
    >
      {text}
    </FrgWebFontBoundary>
  );
});
FrgText.displayName = 'FrgText';
export default FrgText;
