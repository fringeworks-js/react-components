import type { ButtonGroupProps as ButtonGroupPrimitiveProps } from '@fringeworks/react-primitives';
import type { GroupLayoutProps } from '../_internal/_groupLayout';

export type ButtonGroupProps<V> = ButtonGroupPrimitiveProps<V> &
  GroupLayoutProps;
