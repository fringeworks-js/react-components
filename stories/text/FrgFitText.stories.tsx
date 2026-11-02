import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FrgFitTextProps } from '../../src/text/FrgFitText';
import FrgFitText from '../../src/text/FrgFitText';

/**
 * `value`の文字列（または表現の候補）を、要素の大きさと行数に収めて表示する
 *
 * FrgInline（`span`）を包んでいるため、`display: block`にして幅を決める。
 * 右下をドラッグして大きさを変えられる。
 * CSS の font-size（16px）は親の要素から継承する（`minFontSize`・`maxFontSize`を指定すると、要素の font-size は上書きされるため）
 */
const meta = {
  title: 'text/FrgFitText',
  component: FrgFitText,
  argTypes: {
    value: { control: 'object' },
    wrap: { control: 'select', options: ['none', 'normal', 'anywhere'] },
    maxLines: { control: 'number' },
    minFontSize: { control: 'number' },
    maxFontSize: { control: 'number' },
    truncate: { control: 'boolean' },
    resizeFirst: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ellipsis: { control: 'text' },
    truncateBoundary: { control: 'select', options: ['grapheme', 'word'] },
    truncatePosition: {
      control: 'select',
      options: ['end', 'middle', 'start'],
    },
  },
  args: {
    value: ['1,234,567', '1.2M'],
    style: {
      display: 'block',
      width: 160,
      height: 64,
      padding: 8,
      border: '1px solid #888',
      lineHeight: 1.2,
      resize: 'both',
      overflow: 'hidden',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'sans-serif', fontSize: 16, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<FrgFitTextProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 候補を選ぶだけ（収まる最初の候補を表示する）
 */
export const Default: Story = {};

/**
 * 候補を先に切り替え、文字の大きさを揃える（resizeFirst: false）
 */
export const ChooseFirst: Story = {
  args: {
    minFontSize: 12,
    maxFontSize: 48,
    truncate: true,
  },
};

/**
 * 先に縮め、正確な表現を残す（resizeFirst: true）
 */
export const ResizeFirst: Story = {
  args: {
    minFontSize: 12,
    maxFontSize: 48,
    truncate: true,
    resizeFirst: true,
  },
};

/**
 * 1つの文字列を、複数行に折り返して省略する
 */
export const TruncateLines: Story = {
  args: {
    value:
      'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
    wrap: 'normal',
    maxLines: 2,
    truncate: true,
    style: {
      display: 'block',
      width: 240,
      padding: 8,
      border: '1px solid #888',
      resize: 'horizontal',
      overflow: 'hidden',
    },
  },
};
