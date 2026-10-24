import limitDecimal from '@fringeworks/numeric-string/limitDecimal';
import distribute from '@fringeworks/utils/object/distribute';
import { forwardRef } from 'react';
import { LIMIT_DECIMAL_OPTION_KEYS } from '../../_internal/constants';
import type { FrgNumericInputProps } from './types';

const FrgNumericInput = forwardRef<HTMLInputElement, FrgNumericInputProps>(
  (props, ref) => {
    const { value, onChangeValue, onChange, ...rest } = props;
    const { limit: limitOptions, input: inputProps } = distribute(rest, {
      limit: LIMIT_DECIMAL_OPTION_KEYS,
      input: null,
    });
    const strValue = limitDecimal(value, limitOptions);

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
