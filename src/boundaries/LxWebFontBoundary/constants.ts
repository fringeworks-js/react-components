import exactKeysFromRecord from '@niche-works/utils/object/exactKeysFromRecord';
import type { LxWebFontBoundaryOwnProps } from './types';

export const LX_WEB_FONT_BOUNDARY_PROP_KEYS =
  exactKeysFromRecord<LxWebFontBoundaryOwnProps>({
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
