import { withCheckboxGroup } from '@fringeworks/react-primitives';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Switch } from '../src';
import '../src/styles.scss';

const meta = {
  title: 'Switch',
  component: Switch,
  args: { children: '通知を受け取る' },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 非制御（Storybook の Actions で通知を確かめる）
 */
export const Uncontrolled: Story = {};

/**
 * `useState` で値を持つ
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(true);
    return (
      <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
        <Switch {...args} value={value} onValueChange={setValue} />
        <span>value: {String(value)}</span>
      </div>
    );
  },
};

/**
 * 状態（無効・読み取り専用・不正）
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
      <Switch disabled>無効</Switch>
      <Switch disabled defaultValue>
        無効（オン）
      </Switch>
      <Switch readOnly defaultValue>
        読み取り専用
      </Switch>
      <Switch invalid>不正</Switch>
    </div>
  ),
};

/**
 * CSS 変数で見た目を調整する例
 */
export const CustomStyle: Story = {
  args: {
    defaultValue: true,
    style: {
      '--frg-switch-width': '2.75em',
      '--frg-switch-height': '1.5em',
      '--frg-switch-checkedColor': '#0a7d4f',
    } as CSSProperties,
  },
};

// react-primitives の withCheckboxGroup に、見た目を付けた Switch を組み込む
const SwitchGroup = withCheckboxGroup({ Checkbox: Switch });

/**
 * react-primitives の `withCheckboxGroup` に `Switch` を組み込み、スイッチを並べたグループにする。
 * `Switch` の口の props は `CheckboxSlotProps` と合うので、そのまま組み込める
 */
export const InGroup: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['mail']);
    return (
      <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
        <SwitchGroup
          aria-label="通知"
          style={{ display: 'grid', gap: 8 }}
          options={[
            { value: 'mail', label: 'メール' },
            { value: 'push', label: 'プッシュ通知' },
          ]}
          value={value}
          onValueChange={setValue}
          showSelectAll
          selectAllLabel="すべて"
        />
        <span>value: {JSON.stringify(value)}</span>
      </div>
    );
  },
};
