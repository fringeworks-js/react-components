import distribute from '@niche-works/utils/object/distribute';
import { forwardRef } from 'react';
import LxInline from '../../base/LxInline';
import LxFontBoundary from '../../boundaries/LxFontBoundary';
import type { LxTextProps } from './types';

const BOUNDARY_PROPS = [
  'fallback',
  'fallbackDefer',
  'loader',
  'pending',
  'pendingDefer',
  'preserveOnceFallback',
  'preserveOnceReady',
  'readyDefer',
  'timeout',
] as const;

/**
 * 指定のフォントが読み込み済みであることを確認した後に値を表示する
 */
const LxFont = forwardRef<HTMLSpanElement, LxTextProps>((props, ref) => {
  const { value, fontFamily, fontVariant, ...rest } = props;
  const { boundaryProps, inlineProps } = distribute(rest, {
    boundaryProps: BOUNDARY_PROPS,
    inlineProps: null,
  });

  return (
    <LxFontBoundary
      fontFamily={fontFamily}
      fontVariant={fontVariant}
      fallback={<span></span>}
      {...boundaryProps}
    >
      <LxInline
        ref={ref}
        {...inlineProps}
        style={{
          fontFamily,
          fontVariant,
          ...inlineProps.style,
        }}
      >
        {value}
      </LxInline>
    </LxFontBoundary>
  );
});
LxFont.displayName = 'LxFont';
export default LxFont;
