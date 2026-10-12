import { limitDecimal } from '@fringeworks/numeric-string';
import { forwardRef } from 'react';
import type { FrgNumericInputProps } from './types';

const FrgNumericInput = forwardRef<HTMLInputElement, FrgNumericInputProps>(
  (props, ref) => {
    const { value, onChangeValue, ...rest } = props;
    const strValue = limitDecimal(value, rest);

    return (
      <input
        ref={ref}
        type="text"
        value={strValue}
        onChange={(event) => onChangeValue?.(event.target.value)}
      />
    );
  },
);
FrgNumericInput.displayName = 'FrgNumericInput';
export default FrgNumericInput;
