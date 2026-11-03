import { OptionLabel } from '@fringeworks/react-primitives';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { RadioGroup } from '../src';
import '../src/styles.scss';

const OPTIONS = [
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL（disabled）', disabled: true },
];

const meta = {
  title: 'RadioGroup',
  component: RadioGroup<string>,
  args: {
    options: OPTIONS,
    defaultValue: 'm',
    direction: 'y',
    disabled: false,
    readOnly: false,
    required: false,
    invalid: false,
    unlistedPlacement: 'end',
    keepUnlisted: false,
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
} satisfies Meta<typeof RadioGroup<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 縦に並べる（既定）。Tab キーでグループに入り、矢印キーで選ぶ
 */
export const Vertical: Story = {};

/**
 * 横に並べ、入りきらなければ折り返す
 */
export const Horizontal: Story = {
  args: { direction: 'x' },
};

/**
 * 制御と、表示の部品（react-primitives の `OptionLabel`）との組み合わせ
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <RadioGroup
          {...args}
          defaultValue={undefined}
          value={value}
          onValueChange={setValue}
        />
        <span>
          選んだ大きさ:{' '}
          <OptionLabel
            options={args.options}
            value={value}
            unlistedPlacement={args.unlistedPlacement}
            placeholder="（未選択）"
          />
        </span>
        <button
          type="button"
          style={{ justifySelf: 'start' }}
          onClick={() => setValue(null)}
        >
          未選択に戻す
        </button>
      </div>
    );
  },
};

/**
 * 選択肢外の値（`value` に入っているが `options` に無い値）
 */
export const Unlisted: Story = {
  args: { defaultValue: 'xxl' },
};

/**
 * disabled・readOnly・invalid
 */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <RadioGroup {...args} direction="x" disabled />
      <RadioGroup {...args} direction="x" readOnly />
      <RadioGroup {...args} direction="x" invalid />
    </div>
  ),
};

/**
 * CSS 変数で見た目を調整する例
 */
export const CustomizedWithCssVariables: Story = {
  args: { direction: 'x', gap: 24 },
  render: (args) => (
    <RadioGroup
      {...args}
      style={
        {
          '--frg-radio-size': '18px',
          '--frg-radio-checkedColor': '#0a7d4f',
          '--frg-radio-borderColor': '#0a7d4f',
        } as CSSProperties
      }
    />
  ),
};
