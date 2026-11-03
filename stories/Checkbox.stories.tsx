import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Checkbox } from '../src';
import '../src/styles.scss';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  args: {
    children: '利用規約に同意する',
    disabled: false,
    readOnly: false,
    required: false,
    invalid: false,
    indeterminate: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 非制御（`defaultValue`）
 */
export const Uncontrolled: Story = {};

/**
 * 制御（`value` と `onValueChange`）
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(false);
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <Checkbox {...args} value={value} onValueChange={setValue} />
        <span>value: {String(value)}</span>
      </div>
    );
  },
};

/**
 * 状態の並び（Tab キーでフォーカスの見た目も確かめられる）
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
      <Checkbox>チェックなし</Checkbox>
      <Checkbox defaultValue>チェックあり</Checkbox>
      <Checkbox indeterminate>不確定</Checkbox>
      <Checkbox disabled>disabled</Checkbox>
      <Checkbox defaultValue disabled>
        disabled（チェックあり）
      </Checkbox>
      <Checkbox defaultValue readOnly>
        readOnly（押しても変わらない）
      </Checkbox>
      <Checkbox invalid>invalid</Checkbox>
    </div>
  ),
};

/**
 * CSS 変数で見た目を調整する例
 */
export const CustomizedWithCssVariables: Story = {
  render: () => (
    <div
      style={
        {
          display: 'grid',
          gap: 8,
          justifyItems: 'start',
          fontSize: 18,
          '--frg-checkbox-size': '20px',
          '--frg-checkbox-radius': '50%',
          '--frg-checkbox-checkedColor': '#0a7d4f',
          '--frg-checkbox-gap': '10px',
        } as CSSProperties
      }
    >
      <Checkbox defaultValue>緑・丸・大きめ</Checkbox>
      <Checkbox indeterminate>不確定</Checkbox>
      <Checkbox>チェックなし</Checkbox>
    </div>
  ),
};
