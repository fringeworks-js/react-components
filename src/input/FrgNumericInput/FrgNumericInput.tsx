import { limitDecimal } from '@fringeworks/numeric-string';
import { distribute } from '@fringeworks/utils';
import { forwardRef, useMemo } from 'react';
import type { FrgNumericInputProps } from './types';

const FrgNumericInput = forwardRef<HTMLInputElement, FrgNumericInputProps>(
  (props, ref) => {
    const { value, onChangeValue, onChange, ...rest } = props;
    const { limit: limitOptions, input: inputProps } = distribute(rest, {
      limit: [
        'emptyValue',
        'nanValue',
        'outOfRangeValue',
        'min',
        'max',
        'decimals',
        'roundingMode',
        'clampToMin',
        'clampToMax',
        'interactive',
        'trimLeadingZeros',
      ],
      input: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const strValue = useMemo(() => limitDecimal(value, limitOptions), [value]);

    return (
      <input
        ref={ref}
        type="text"
        value={strValue ?? ''}
        onChange={(event) => {
          onChange?.(event);
          onChangeValue?.(event.target.value);
        }}
        {...inputProps}
      />
    );
  },
);
FrgNumericInput.displayName = 'FrgNumericInput';
export default FrgNumericInput;
