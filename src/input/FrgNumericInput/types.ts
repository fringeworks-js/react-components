import type { LimitDecimalOptions } from '@fringeworks/numeric-string/limitDecimal';
import type { InputHTMLAttributes } from 'react';

export type FrgNumericInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'type'
> &
  LimitDecimalOptions & {
    /**
     * 値
     */
    value?: string | number | null | undefined;

    onChangeValue?: (value: string) => void;
  };
