import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import type { FrgNumericInputProps } from '../../src/input/FrgNumericInput';
import FrgNumericInput from '../../src/input/FrgNumericInput';

/**
 * `value`を`limitDecimal`で制限して表示する数値入力
 *
 * 制御コンポーネントのため、入力された値を`value`に戻して表示を確認する
 */
const meta = {
  title: 'input/FrgNumericInput',
  component: FrgNumericInput,
  argTypes: {
    value: { control: false },
    min: { control: 'text' },
    max: { control: 'text' },
    decimals: { control: 'number' },
    emptyValue: { control: 'text' },
    nanValue: { control: 'text' },
    outOfRangeValue: { control: 'text' },
    clampToMin: { control: 'boolean' },
    clampToMax: { control: 'boolean' },
    interactive: { control: 'boolean' },
    trimLeadingZeros: { control: 'boolean' },
  },
  args: {
    onChangeValue: fn(),
  },
  render: function Render({ value: initialValue, onChangeValue, ...rest }) {
    const [value, setValue] = useState<FrgNumericInputProps['value']>(
      initialValue ?? '',
    );

    return (
      <div>
        <FrgNumericInput
          {...rest}
          value={value}
          onChangeValue={(newValue) => {
            setValue(newValue);
            onChangeValue?.(newValue);
          }}
        />
        <p>
          value: <code>{JSON.stringify(value)}</code>
        </p>
      </div>
    );
  },
} satisfies Meta<FrgNumericInputProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    interactive: true,
  },
};

export const Decimals: Story = {
  args: {
    decimals: 2,
    interactive: true,
  },
};

export const Range: Story = {
  args: {
    min: 0,
    max: 100,
    interactive: true,
  },
};

export const Clamp: Story = {
  args: {
    min: 0,
    max: 100,
    clampToMin: true,
    clampToMax: true,
    interactive: true,
  },
};

export const InitialValue: Story = {
  args: {
    value: 1234.5678,
    decimals: 2,
  },
};
