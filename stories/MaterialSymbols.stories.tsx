import { withDesign } from '@fringeworks/react-contract';
import { MaterialSymbolOutlined } from '@fringeworks/react-icon-material-symbols';
import '@fringeworks/react-icon-material-symbols/font-outlined.css';
import '@fringeworks/react-icon-material-symbols/styles.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  type CheckboxIndicatorSlotProps,
  type CollapsibleIndicatorSlotProps,
  type RadioIndicatorSlotProps,
  withButtonIcon,
  withCheckboxGroupIndicator,
  withCheckboxIndicator,
  withCollapsibleIndicator,
  withRadioGroupIndicator,
} from '../src';
import '../src/styles.scss';

/**
 * react-icon-material-symbols のアイコンを組み込んだ例。アプリでは、ここで作っている部品を1回だけ作って使う
 */
const meta = {
  title: 'Material Symbols',
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ボタン: アイコンのセットを組み込み、使う場所では名前だけを渡す
const IconButton = withButtonIcon(MaterialSymbolOutlined);

// チェックボックスの印: 状態からアイコンの名前を選ぶ。受け取った className・data-* は、そのまま渡す
function CheckboxSymbol({
  checked,
  indeterminate,
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  ...props
}: CheckboxIndicatorSlotProps) {
  const value = indeterminate
    ? 'indeterminate_check_box'
    : checked
      ? 'check_box'
      : 'check_box_outline_blank';
  return (
    <MaterialSymbolOutlined
      {...props}
      value={value}
      filled={checked || indeterminate}
    />
  );
}

// ラジオボタンの印
function RadioSymbol({
  checked,
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  ...props
}: RadioIndicatorSlotProps) {
  return (
    <MaterialSymbolOutlined
      {...props}
      value={checked ? 'radio_button_checked' : 'radio_button_unchecked'}
    />
  );
}

const SymbolCheckbox = withCheckboxIndicator(CheckboxSymbol);
const SymbolCheckboxGroup = withCheckboxGroupIndicator(CheckboxSymbol);
const SymbolRadioGroup = withRadioGroupIndicator(RadioSymbol);

const fruits = [
  { value: 'apple', label: 'りんご' },
  { value: 'orange', label: 'みかん' },
  { value: 'grape', label: 'ぶどう', disabled: true },
];

/**
 * `withButtonIcon(MaterialSymbolOutlined)` で作ったボタン。`icon` は中身の前、`endIcon` は後ろ
 */
export const Button: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton icon="save">保存</IconButton>
      <IconButton icon="delete">削除</IconButton>
      <IconButton endIcon="arrow_drop_down">メニュー</IconButton>
      <IconButton icon="add" aria-label="追加" />
      <IconButton icon="download" disabled>
        ダウンロード
      </IconButton>
    </div>
  ),
};

/**
 * `withCheckboxIndicator`・`withCheckboxGroupIndicator` で、チェックボックスの印を Material Symbols にしたもの
 */
export const Checkbox: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['apple']);
    return (
      <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
        <SymbolCheckbox defaultValue>同意する</SymbolCheckbox>
        <SymbolCheckbox indeterminate>一部だけ選んでいる</SymbolCheckbox>
        <SymbolCheckbox disabled>選べない</SymbolCheckbox>
        <SymbolCheckboxGroup
          options={fruits}
          value={value}
          onValueChange={setValue}
          showSelectAll
          selectAllLabel="すべて"
        />
      </div>
    );
  },
};

/**
 * `withRadioGroupIndicator` で、ラジオボタンの印を Material Symbols にしたもの
 */
export const RadioGroup: Story = {
  render: () => (
    <SymbolRadioGroup options={fruits} defaultValue="orange" direction="x" />
  ),
};

// 差し替えた印の色・大きさは、design の indicator.color・indicator.size で変えられる
const BrandCheckbox = withDesign(SymbolCheckbox, {
  indicator: { color: { checked: '#d81b60' }, size: '1.5em' },
});

/**
 * 差し替えた印の色（`indicator.color`）と大きさ（`indicator.size`）を `withDesign` で決めたもの
 */
export const IndicatorDesign: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <BrandCheckbox defaultValue>お気に入り</BrandCheckbox>
      <BrandCheckbox>あとで見る</BrandCheckbox>
    </div>
  ),
};

// 開閉の印（1つのアイコンを回す）: 右向きのアイコンを描くだけにし、開いたときの角度は design の indicator.rotate で決める
function RotatingExpandSymbol({
  open: _open,
  disabled: _disabled,
  ...props
}: CollapsibleIndicatorSlotProps) {
  return <MaterialSymbolOutlined {...props} value="keyboard_arrow_right" />;
}

const RotatingCollapsible = withDesign(
  withCollapsibleIndicator(RotatingExpandSymbol),
  { indicator: { rotate: { open: 90 } } },
);

// 開閉の印（描き分ける）: 開いているかでアイコンを替える
function SwitchingExpandSymbol({
  open,
  disabled: _disabled,
  ...props
}: CollapsibleIndicatorSlotProps) {
  return (
    <MaterialSymbolOutlined
      {...props}
      value={open ? 'expand_circle_down' : 'expand_circle_right'}
    />
  );
}

const SwitchingCollapsible = withCollapsibleIndicator(SwitchingExpandSymbol);

/**
 * `withCollapsibleIndicator` で、開閉の印を Material Symbols にしたもの。
 * 上の3つは1つのアイコンを回し（`indicator.rotate` の `open` を 90）、下の1つは開いたときにアイコンを替える
 */
export const Collapsible: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <RotatingCollapsible summary="詳しい説明">
        開いたときに表示する中身です。
      </RotatingCollapsible>
      <RotatingCollapsible summary="最初から開いている" defaultOpen>
        中身
      </RotatingCollapsible>
      <RotatingCollapsible summary="開けない" disabled>
        中身
      </RotatingCollapsible>
      <SwitchingCollapsible summary="アイコンを替える">
        中身
      </SwitchingCollapsible>
    </div>
  ),
};
