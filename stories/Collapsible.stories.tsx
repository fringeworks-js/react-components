import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Collapsible, TextInput } from '../src';
import '../src/styles.scss';

const meta = {
  title: 'Collapsible',
  component: Collapsible,
  args: {
    summary: '詳しい条件',
    children: 'ここに、開いたときに見える中身を置きます。',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 非制御。見出しを押す（Enter・Space でも）と開閉する
 */
export const Uncontrolled: Story = {};

/**
 * 制御。外のボタンからも開閉できる
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
        <button type="button" onClick={() => setOpen(!open)}>
          外から{open ? '閉じる' : '開く'}
        </button>
        <Collapsible {...args} open={open} onOpenChange={setOpen} />
        <span>open: {String(open)}</span>
      </div>
    );
  },
};

/**
 * 閉じても中身は描いたまま（入力した文字が消えない）。
 * ページ内検索（Ctrl+F）で「かくれた文字」を探すと、ブラウザーが自動で開く（Chrome など）
 */
export const KeepContent: Story = {
  args: {
    children: (
      <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
        <TextInput placeholder="入力してから閉じる" />
        <span>かくれた文字</span>
      </div>
    ),
  },
};

/**
 * disabled と、CSS 変数で見た目を調整する例
 */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Collapsible {...args} summary="disabled" disabled />
      <Collapsible
        {...args}
        summary="CSS 変数で調整"
        style={
          {
            '--frg-collapsible-indicator-color': '#2f6fde',
            '--frg-collapsible-summary-gap': '10px',
            '--frg-collapsible-gap': '4px',
          } as CSSProperties
        }
      />
    </div>
  ),
};
