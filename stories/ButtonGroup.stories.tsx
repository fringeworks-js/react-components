import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from '../src';
import '../src/styles.scss';

const meta = {
  title: 'ButtonGroup',
  component: ButtonGroup<string>,
  args: {
    options: [
      { value: 'copy', label: 'コピー' },
      { value: 'paste', label: '貼り付け' },
      { value: 'delete', label: '削除', disabled: true },
    ],
    direction: 'x',
    disabled: false,
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['x', 'y'] },
    gap: { control: { type: 'number', min: 0 } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ButtonGroup<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 横に並べる（既定）。押されたボタンの選択肢の `value` を `onMainAction` に渡す
 */
export const Horizontal: Story = {};

/**
 * 縦に並べる
 */
export const Vertical: Story = {
  args: { direction: 'y' },
};

/**
 * すべてのボタンを操作できなくする
 */
export const Disabled: Story = {
  args: { disabled: true },
};
