import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { TextInput } from '../src';
import '../src/styles.scss';

const meta = {
  title: 'TextInput',
  component: TextInput,
  args: {
    placeholder: '名前',
    valueChangeTiming: 'commit',
    disabled: false,
    readOnly: false,
    required: false,
    invalid: false,
  },
  argTypes: {
    valueChangeTiming: {
      control: 'inline-radio',
      options: ['commit', 'input'],
    },
    type: {
      control: 'select',
      options: ['text', 'search', 'email', 'url', 'tel', 'password'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 非制御。フォーカスが外れたとき・Enter で確定する（Storybook の Actions で確かめる）
 */
export const Uncontrolled: Story = {};

/**
 * 確定した値と、入力中の文字列（`onInputValueChange`）を並べて見る。
 * 日本語を入力して、変換を決める Enter で確定しないことも確かめられる。Esc で確定した値に戻る
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    const [text, setText] = useState('');
    return (
      <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
        <TextInput
          {...args}
          value={value}
          onValueChange={setValue}
          onInputValueChange={setText}
        />
        <span>value（確定）: {JSON.stringify(value)}</span>
        <span>onInputValueChange（入力中）: {JSON.stringify(text)}</span>
      </div>
    );
  },
};

/**
 * 入力のたびに確定する（`valueChangeTiming="input"`）
 */
export const InputTiming: Story = {
  args: { valueChangeTiming: 'input' },
  render: Controlled.render,
};

/**
 * 状態と、CSS 変数で見た目を調整する例
 */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
      <TextInput {...args} placeholder="通常" />
      <TextInput {...args} defaultValue="disabled" disabled />
      <TextInput {...args} defaultValue="readOnly" readOnly />
      <TextInput {...args} defaultValue="invalid" invalid />
      <TextInput
        {...args}
        placeholder="CSS 変数で調整"
        style={
          {
            width: 280,
            '--frg-textinput-borderRadius': '999px',
            '--frg-textinput-paddingX': '1em',
            '--frg-textinput-outlineColor-focus': '#0a7d4f',
          } as CSSProperties
        }
      />
    </div>
  ),
};
