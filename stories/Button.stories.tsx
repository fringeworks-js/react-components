import type { IconSlotProps } from '@fringeworks/react-contract';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Button, ButtonGroup, withButtonIcon } from '../src';
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

// 例のためのアイコンの部品（実際には react-icon とそのアダプターの部品を組み込む）
const demoPaths = {
  save: 'M5 3h11l3 3v15H5z M8 3v6h8V3 M8 14h8v7H8z',
  expand: 'M6 9l6 6 6-6',
  add: 'M12 5v14 M5 12h14',
} as const;

function DemoIcon({
  value,
  className,
  ...props
}: IconSlotProps<keyof typeof demoPaths>) {
  return (
    <svg
      {...props}
      className={className}
      aria-hidden={props['aria-label'] ? undefined : true}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={demoPaths[value]} />
    </svg>
  );
}

const IconButton = withButtonIcon(DemoIcon);

/**
 * `withButtonIcon` で作った、アイコンを置けるボタン。`icon` は中身の前、`endIcon` は後ろ。間隔は `design` の `gap`
 */
export const WithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton {...args} icon="save">
        保存
      </IconButton>
      <IconButton {...args} endIcon="expand">
        メニュー
      </IconButton>
      <IconButton {...args} icon="add" aria-label="追加">
        {undefined}
      </IconButton>
      <IconButton
        {...args}
        icon="save"
        design={{ gap: 2 }}
        style={{ fontSize: 20 }}
      >
        大きく
      </IconButton>
    </div>
  ),
};
