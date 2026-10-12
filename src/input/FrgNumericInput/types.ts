import type { LimitDecimalOptions } from '@fringeworks/numeric-string';
import type { HTMLAttributes } from 'react';

export type FrgNumericInputProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  'value' | 'input'
> &
  LimitDecimalOptions & {
    /**
     * 値
     */
    value?: string | number | null | undefined;

    onChangeValue?: (value: string | null | undefined) => void;
  };
