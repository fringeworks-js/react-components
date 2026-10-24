import type { LimitDecimalOptions } from '@fringeworks/numeric-string/limitDecimal';
import exactKeysFromRecord from '@fringeworks/utils/object/exactKeysFromRecord';
import type { FrgWebFontBoundaryOwnProps } from '../boundaries/FrgWebFontBoundary';

/**
 * FrgWebFontBoundaryの固有のプロパティのキー
 */
export const FRG_WEB_FONT_BOUNDARY_PROP_KEYS: (keyof FrgWebFontBoundaryOwnProps)[] =
  exactKeysFromRecord<FrgWebFontBoundaryOwnProps>({
    pending: true,
    fallback: true,
    pendingDefer: true,
    readyDefer: true,
    preserveOnceReady: true,
    fallbackDefer: true,
    preserveOnceFallback: true,
    timeout: true,
    loader: true,
    initialState: true,
    fonts: true,
  });

/**
 * limitDecimalのオプションのキー
 */
export const LIMIT_DECIMAL_OPTION_KEYS: (keyof LimitDecimalOptions)[] =
  exactKeysFromRecord<LimitDecimalOptions>({
    emptyValue: true,
    nanValue: true,
    outOfRangeValue: true,
    min: true,
    max: true,
    decimals: true,
    roundingMode: true,
    clampToMin: true,
    clampToMax: true,
    interactive: true,
    trimLeadingZeros: true,
  });
