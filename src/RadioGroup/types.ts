import type { RadioGroupProps as RadioGroupPrimitiveProps } from '@fringeworks/react-primitives';
import type { GroupLayoutProps } from '../_internal/_groupLayout';

export type RadioGroupProps<V> = RadioGroupPrimitiveProps<V> & GroupLayoutProps;
