import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { CheckboxGroup } from '../src';
import '../src/styles.scss';

const OPTIONS = [
  { value: 'apple', label: 'りんご' },
  { value: 'orange', label: 'みかん' },
  { value: 'grape', label: 'ぶどう' },
  { value: 'peach', label: 'もも（disabled）', disabled: true },
  { value: 'pear', label: 'なし' },
  { value: 'cherry', label: 'さくらんぼ' },
];

const meta = {
  title: 'CheckboxGroup',
  component: CheckboxGroup<string>,
  args: {
    options: OPTIONS,
    defaultValue: ['apple'],
    direction: 'y',
    disabled: false,
    readOnly: false,
    invalid: false,
    showSelectAll: false,
    selectAllLabel: 'すべて',
    unlistedPlacement: 'end',
    keepUnlisted: false,
    selectAllIncludesUnlisted: false,
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['y', 'x'] },
    gap: { control: { type: 'number', min: 0 } },
    unlistedPlacement: {
      control: 'inline-radio',
      options: ['hidden', 'start', 'end'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckboxGroup<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 縦に並べる（既定）
 */
export const Vertical: Story = {};

/**
 * 横に並べ、入りきらなければ折り返す（枠の右下をドラッグして幅を変える）
 */
export const Horizontal: Story = {
  args: { direction: 'x', showSelectAll: true },
  render: (args) => (
    <div
      style={{
        width: 320,
        padding: 8,
        border: '1px dashed #aaa',
        resize: 'horizontal',
        overflow: 'hidden',
      }}
    >
      <CheckboxGroup {...args} />
    </div>
  ),
};

/**
 * すべて選ぶと、制御での値の受け渡し
 */
export const SelectAllControlled: Story = {
  args: { showSelectAll: true },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(['apple']);
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <CheckboxGroup
          {...args}
          defaultValue={undefined}
          value={value}
          onValueChange={setValue}
        />
        <span>value: {JSON.stringify(value)}</span>
      </div>
    );
  },
};

/**
 * 選択肢外の値（`value` に入っているが `options` に無い値）
 */
export const Unlisted: Story = {
  args: { showSelectAll: true, keepUnlisted: true },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(['apple', 'melon']);
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <CheckboxGroup
          {...args}
          defaultValue={undefined}
          value={value}
          onValueChange={setValue}
        />
        <span>value: {JSON.stringify(value)}</span>
      </div>
    );
  },
};

/**
 * disabled・readOnly・invalid
 */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <CheckboxGroup {...args} direction="x" disabled />
      <CheckboxGroup {...args} direction="x" readOnly />
      <CheckboxGroup {...args} direction="x" invalid />
    </div>
  ),
};

/**
 * CSS 変数で見た目を調整する例
 */
export const CustomizedWithCssVariables: Story = {
  args: { direction: 'x', gap: 24, showSelectAll: true },
  render: (args) => (
    <CheckboxGroup
      {...args}
      style={
        {
          '--frg-checkbox-indicator-size': '18px',
          '--frg-checkbox-indicator-backgroundColor-checked': '#b5476b',
          '--frg-checkbox-indicator-backgroundColor-indeterminate': '#b5476b',
          '--frg-checkbox-indicator-borderColor': '#b5476b',
          '--frg-checkbox-indicator-borderColor-checked': '#b5476b',
          '--frg-checkbox-indicator-borderColor-indeterminate': '#b5476b',
        } as CSSProperties
      }
    />
  ),
};
