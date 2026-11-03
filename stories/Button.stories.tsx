import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Button, ButtonGroup } from '../src';
import '../src/styles.scss';

const meta = {
  title: 'Button',
  component: Button<string>,
  args: {
    children: '保存',
    value: 'save',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 押すと `value` を `onMainAction` に渡す（Storybook の Actions で確かめる）
 */
export const Default: Story = {};

/**
 * 単独のボタンとボタングループで、同じハンドラーを使える
 */
export const SharedHandler: Story = {
  render: function Render() {
    const [log, setLog] = useState<string[]>([]);
    const run = (value: string) => setLog((prev) => [...prev, value]);
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <Button value="save" onMainAction={run}>
          保存
        </Button>
        <ButtonGroup
          options={[
            { value: 'copy', label: 'コピー' },
            { value: 'paste', label: '貼り付け' },
            { value: 'delete', label: '削除', disabled: true },
          ]}
          onMainAction={run}
        />
        <span>onMainAction: {JSON.stringify(log)}</span>
      </div>
    );
  },
};

/**
 * `onClick` で `preventDefault()` すると、`onMainAction` は呼ばない
 */
export const PreventMainAction: Story = {
  render: function Render() {
    const [log, setLog] = useState<string[]>([]);
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <Button
          value="delete"
          onClick={(event) => {
            if (!window.confirm('削除しますか')) {
              event.preventDefault();
            }
          }}
          onMainAction={(value) => setLog((prev) => [...prev, value])}
        >
          削除（確認してから）
        </Button>
        <span>onMainAction: {JSON.stringify(log)}</span>
      </div>
    );
  },
};

/**
 * 状態と、CSS 変数で見た目を調整する例
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button>通常</Button>
      <Button disabled>disabled</Button>
      <Button
        style={
          {
            '--frg-button-backgroundColor': '#2f6fde',
            '--frg-button-backgroundColor-hover': '#2a63c7',
            '--frg-button-backgroundColor-active': '#2457b0',
            '--frg-button-borderColor': '#2f6fde',
            '--frg-button-color': '#fff',
          } as CSSProperties
        }
      >
        CSS 変数で塗る
      </Button>
    </div>
  ),
};
