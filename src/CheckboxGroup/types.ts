import type { CheckboxGroupProps as CheckboxGroupPrimitiveProps } from '@fringeworks/react-primitives';
import type { GroupLayoutProps } from '../_internal/_groupLayout';
import type Checkbox from '../Checkbox';

export type CheckboxGroupProps<V> = CheckboxGroupPrimitiveProps<
  V,
  { Checkbox: typeof Checkbox }
> &
  GroupLayoutProps;
