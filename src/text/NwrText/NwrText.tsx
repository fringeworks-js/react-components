import distribute from '@niche-works/utils/object/distribute';
import { forwardRef } from 'react';
import NwrInline from '../../base/NwrInline';
import NwrFontBoundary from '../../boundaries/NwrFontBoundary';
import type { NwrTextProps } from './types';

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
const NwrFont = forwardRef<HTMLSpanElement, NwrTextProps>((props, ref) => {
  const { value, fontFamily, fontVariant, ...rest } = props;
  const { boundaryProps, inlineProps } = distribute(rest, {
    boundaryProps: BOUNDARY_PROPS,
    inlineProps: null,
  });

  return (
    <NwrFontBoundary
      fontFamily={fontFamily}
      fontVariant={fontVariant}
      fallback={<span></span>}
      {...boundaryProps}
    >
      <NwrInline
        ref={ref}
        {...inlineProps}
        style={{
          fontFamily,
          fontVariant,
          ...inlineProps.style,
        }}
      >
        {value}
      </NwrInline>
    </NwrFontBoundary>
  );
});
NwrFont.displayName = 'NwrFont';
export default NwrFont;
