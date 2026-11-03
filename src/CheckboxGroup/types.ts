import type { CheckboxGroupProps as CheckboxGroupPrimitiveProps } from '@fringeworks/react-primitives';
import type { GroupLayoutProps } from '../_internal/_groupLayout';

export type CheckboxGroupProps<V> = CheckboxGroupPrimitiveProps<V> &
  GroupLayoutProps;
