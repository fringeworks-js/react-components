import type { LimitDecimalOptions } from '@fringeworks/numeric-string';

export type FrgNumericInputProps = LimitDecimalOptions & {
  /**
   * 値
   */
  value?: string | number | null | undefined;

  onChangeValue?: (value: string) => void;
};
