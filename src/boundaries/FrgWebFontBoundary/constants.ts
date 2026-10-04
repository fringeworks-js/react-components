import exactKeysFromRecord from '@fringeworks/utils/object/exactKeysFromRecord';
import type { FrgWebFontBoundaryOwnProps } from './types';

export const LX_WEB_FONT_BOUNDARY_PROP_KEYS =
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
