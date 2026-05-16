import { withLayout as wl } from '@niche-works/react-layout';
import type { WithLayoutOptions } from '@niche-works/react-layout/hocs/withLayout';
import type { LooseDictionary } from '@niche-works/types';
import type { ElementType } from 'react';

export type * from '@niche-works/react-layout/hocs/withLayout';

export default function withLayout<
  P extends object = LooseDictionary,
  T = unknown,
>(Component: ElementType<P>, options: WithLayoutOptions = {}) {
  const { styleProp = 'css', styleMergeMode = 'append', ...rest } = options;

  return wl<P, T>(Component, {
    styleProp,
    styleMergeMode,
    ...rest,
  });
}
