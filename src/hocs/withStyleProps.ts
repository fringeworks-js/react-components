import type { StylePropsOptions } from '@niche-works/react-style-props';
import { withStyleProps as wsp } from '@niche-works/react-style-props';
import type { ElementType } from 'react';

export type * from '@niche-works/react-style-props';

export default function withStyleProps<
  P extends Record<string, any>,
  T = unknown,
>(Component: ElementType<P>, options: StylePropsOptions = {}) {
  const { styleProp = 'css', styleMergeMode = 'append', ...rest } = options;
  return wsp<P, T>(Component, {
    styleProp,
    styleMergeMode,
    ...rest,
  });
}
