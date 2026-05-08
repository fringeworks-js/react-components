import type { WidthLayoutOptions } from '@niche-works/react-layout';
import { withLayout as wl } from '@niche-works/react-layout';
import type { LooseRecord } from '@niche-works/types';
import type { ElementType } from 'react';

export type * from '@niche-works/react-layout/hocs/withLayout';

export default function withLayout<P extends object = LooseRecord, T = unknown>(
  Component: ElementType<P>,
  options: WidthLayoutOptions = {},
) {
  const { styleProp = 'css', styleMergeMode = 'append', ...rest } = options;

  return wl<P, T>(Component, {
    styleProp,
    styleMergeMode,
    ...rest,
  });
}
