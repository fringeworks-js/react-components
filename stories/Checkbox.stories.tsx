import { withDesign } from '@fringeworks/react-contract';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Checkbox, createCheckboxDesign, type CheckboxDesign } from '../src';
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
          '--frg-checkbox-indicator-size': '20px',
          '--frg-checkbox-indicator-borderRadius': '50%',
          '--frg-checkbox-indicator-backgroundColor-checked': '#0a7d4f',
          '--frg-checkbox-indicator-borderColor-checked': '#0a7d4f',
          '--frg-checkbox-indicator-backgroundColor-indeterminate': '#0a7d4f',
          '--frg-checkbox-indicator-borderColor-indeterminate': '#0a7d4f',
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

/**
 * design で見た目を調整する例（CSS を書かずに、型付きの値で渡す）
 */
export const CustomizedWithDesign: Story = {
  render: () => {
    const accent = { checked: '#0a7d4f', indeterminate: '#0a7d4f' };
    const design: CheckboxDesign = {
      gap: 10,
      indicator: {
        size: 20,
        borderRadius: '50%',
        backgroundColor: accent,
        borderColor: accent,
        color: { checked: '#ffe066' },
      },
    };
    return (
      <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
        <Checkbox defaultValue design={design}>
          緑・丸・大きめ・黄色の印
        </Checkbox>
        <Checkbox indeterminate design={design}>
          不確定
        </Checkbox>
        <Checkbox design={design}>チェックなし</Checkbox>
        <Checkbox
          defaultValue
          design={{
            indicator: {
              backgroundColor: { checked: 'var(--story-accent, #7c3aed)' },
              borderColor: { checked: 'var(--story-accent, #7c3aed)' },
            },
          }}
        >
          var(--…) でほかの CSS 変数につなぐ
        </Checkbox>
      </div>
    );
  },
};

/**
 * アプリで1回、デザインの既定の値を決める例（withDesign）
 */
const BrandCheckbox = withDesign(Checkbox, {
  indicator: {
    borderRadius: '50%',
    backgroundColor: { checked: '#0a7d4f', indeterminate: '#0a7d4f' },
    borderColor: { checked: '#0a7d4f', indeterminate: '#0a7d4f' },
  },
});

export const WithDesign: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
      <BrandCheckbox defaultValue>アプリの既定（緑・丸）</BrandCheckbox>
      <BrandCheckbox
        defaultValue
        design={{ indicator: { backgroundColor: { checked: '#b5476b' } } }}
      >
        使う場所で背景だけ変える
      </BrandCheckbox>
    </div>
  ),
};

/**
 * メインの色1色からデザインの値を作る例（createCheckboxDesign）
 *
 * 印の色（白か黒）と、薄い色のときの枠・フォーカスの線の色は、自動で決まる
 */
export const CreatedFromPrimaryColor: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
      {(['#2f6fde', '#0a7d5a', '#ffeb3b', '#ff9800', '#e91e63'] as const).map(
        (primaryColor) => {
          const design = createCheckboxDesign({ primaryColor });
          return (
            <div key={primaryColor} style={{ display: 'flex', gap: 16 }}>
              <Checkbox defaultValue design={design}>
                {primaryColor}
              </Checkbox>
              <Checkbox indeterminate design={design}>
                不確定
              </Checkbox>
            </div>
          );
        },
      )}
      <Checkbox
        defaultValue
        invalid
        design={createCheckboxDesign({
          primaryColor: '#0a7d5a',
          primaryContrastColor: '#ffe066',
          neutralColor: '#667085',
          errorColor: '#b42318',
        })}
      >
        primaryContrastColor・neutralColor・errorColor も渡す
      </Checkbox>
      <Checkbox
        invalid
        design={createCheckboxDesign({
          neutralColor: '#667085',
          errorColor: '#b42318',
        })}
      >
        エラー（errorColor）
      </Checkbox>
    </div>
  ),
};

/**
 * 角の丸み（radius）と詰め具合（scaling）からデザインの値を作る例
 *
 * 印の角の丸みは radius の半分で、0.3em より丸くしない（ラジオボタンと紛らわしくならないように）
 */
export const CreatedFromRadiusAndScaling: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
      {([0, 4, 8, 16, 9999] as const).map((radius) => (
        <Checkbox
          key={radius}
          defaultValue
          design={createCheckboxDesign({ primaryColor: '#0a7d5a', radius })}
        >
          radius: {radius}
        </Checkbox>
      ))}
      {([0.85, 1, 1.2] as const).map((scaling) => (
        <Checkbox
          key={scaling}
          defaultValue
          design={createCheckboxDesign({ primaryColor: '#0a7d5a', scaling })}
        >
          scaling: {scaling}
        </Checkbox>
      ))}
    </div>
  ),
};
