import type { ButtonGroupProps as ButtonGroupPrimitiveProps } from '@fringeworks/react-primitives';
import type { GroupLayoutProps } from '../_internal/_groupLayout';
import type Button from '../Button';

export type ButtonGroupProps<V> = ButtonGroupPrimitiveProps<
  V,
  { Button: typeof Button }
> &
  GroupLayoutProps;
