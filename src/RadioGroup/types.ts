import type { RadioGroupProps as RadioGroupPrimitiveProps } from '@fringeworks/react-primitives';
import type { GroupLayoutProps } from '../_internal/_groupLayout';
import type Radio from './_Radio';

export type RadioGroupProps<V> = RadioGroupPrimitiveProps<
  V,
  { Radio: typeof Radio }
> &
  GroupLayoutProps;
