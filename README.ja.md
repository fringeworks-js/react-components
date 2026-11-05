# @fringeworks/react-components

`@fringeworks/react-components` は、アプリでそのまま使える、最小限の見た目を付けた React のコンポーネントを集めた、誰かにとっては便利なライブラリです。

**[English README is available here](./README.md)**

## インストール

```bash
npm install @fringeworks/react-components
# または
pnpm add @fringeworks/react-components
```

React 18 と 19 に対応しています。

## 使い方

```tsx
import { CheckboxGroup } from '@fringeworks/react-components';
import '@fringeworks/react-components/styles.css';

<CheckboxGroup
  options={[
    { value: 'apple', label: 'りんご' },
    { value: 'orange', label: 'みかん' },
  ]}
  value={value}
  onValueChange={setValue}
/>;
```

- コンポーネントは、値と操作の契約（`value`・`defaultValue`・`onValueChange`、`disabled`・`readOnly`・`required`・`invalid`、`options`、`open`・`defaultOpen`・`onOpenChange`、`onMainAction` など）に沿ったプロパティを受け取ります。制御・非制御のどちらでも使えます（`value` が `undefined` 以外なら制御）。
- 振る舞いは [`@fringeworks/react-primitives`](https://github.com/fringeworks-js/react-primitives) で作っています。見た目を自分で決めたい場合は、react-primitives の hook や HOC を使ってください。

### CSS の読み込み

コンポーネントは CSS を import しないため、SSR や React Server Components でもそのまま使えます。CSS は別に読み込んでください。

```ts
// すべてのコンポーネントの CSS
import '@fringeworks/react-components/styles.css';

// 使うコンポーネントの CSS だけ
import '@fringeworks/react-components/button.css';
import '@fringeworks/react-components/buttongroup.css';
import '@fringeworks/react-components/checkbox.css';
import '@fringeworks/react-components/checkboxgroup.css';
import '@fringeworks/react-components/collapsible.css';
import '@fringeworks/react-components/radiogroup.css';
import '@fringeworks/react-components/recordfields.css';
import '@fringeworks/react-components/switch.css';
import '@fringeworks/react-components/table.css';
import '@fringeworks/react-components/textinput.css';
```

### 見た目の調整

見た目は、デザインシステムに寄せない中立なもので、次の3つの方法で調整できます。

1. **プロパティ**: 並べ方や間隔など、レイアウトに関わるもの（`CheckboxGroup` の `direction`・`gap` など）
2. **CSS 変数**: 色・大きさなど（各コンポーネントの「CSS 変数」の表）
3. **CSS のクラス**: コンポーネントの CSS は詳細度が 0（`:where()`）なので、自分のクラス1つで、どのプロパティも上書きできます

```css
.my-checkbox {
  --frg-checkbox-checkedColor: #0a7d4f;
  --frg-checkbox-size: 18px;
}
```

## API

| コンポーネント  | 説明                                         |
| --------------- | -------------------------------------------- |
| `Checkbox`      | チェックボックス                             |
| `Switch`        | スイッチ                                     |
| `CheckboxGroup` | 選択肢から並べた、チェックボックスのグループ |
| `RadioGroup`    | 選択肢から並べた、ラジオボタンのグループ     |
| `Button`        | ボタン                                       |
| `ButtonGroup`   | 選択肢から並べた、ボタンのグループ           |
| `TextInput`     | テキストの入力                               |
| `Collapsible`   | 折りたためる部品                             |
| `Table`         | 行の配列を受け取る表                         |
| `RecordFields`  | レコードの項目を並べる部品                   |

### `Checkbox`

```tsx
<Checkbox value={agreed} onValueChange={setAgreed}>
  利用規約に同意する
</Checkbox>
```

[react-primitives の `Checkbox`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Checkbox` と同じです（`value`・`defaultValue`・`onValueChange`・`disabled`・`readOnly`・`required`・`invalid`・`indeterminate`・`children`・`partsProps`）。

- `<label class="frg-checkbox">` の中に `<input type="checkbox" class="frg-checkbox-input">` と `children` を置きます。
- `disabled`・`invalid` のときは、`<label>` に `data-disabled`・`data-invalid` を付けます。
- チェックボックスは、ブラウザーによる見た目の差をなくすため、`<input>` のまま（`appearance: none`）CSS で描いています。キーボードでの操作やフォーカスは、標準の `<input>` のままです。

| CSS 変数                         | 既定値    | 説明                                   |
| -------------------------------- | --------- | -------------------------------------- |
| `--frg-checkbox-gap`             | `6px`     | チェックボックスと文字の間隔           |
| `--frg-checkbox-size`            | `1em`     | チェックボックスの大きさ               |
| `--frg-checkbox-borderColor`     | `#8a8f98` | 枠の色                                 |
| `--frg-checkbox-radius`          | `0.25em`  | 角の丸み                               |
| `--frg-checkbox-backgroundColor` | `#fff`    | チェックしていないときの背景の色       |
| `--frg-checkbox-checkedColor`    | `#2f6fde` | チェック・不確定のときの背景と枠の色   |
| `--frg-checkbox-invalidColor`    | `#d93025` | `invalid` のときの枠の色               |
| `--frg-checkbox-focusColor`      | `#2f6fde` | キーボードでフォーカスしたときの線の色 |
| `--frg-checkbox-disabledOpacity` | `0.5`     | `disabled` のときの不透明度            |

チェックの印は白で、CSS 変数では変えられません（背景画像で描いているため）。変えたい場合は、`:checked` の `background-image` を上書きしてください。

### `Switch`

```tsx
<Switch value={enabled} onValueChange={setEnabled}>
  通知を受け取る
</Switch>
```

[react-primitives の `Switch`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Switch` と同じです（`Checkbox` から `indeterminate` を除いたもの）。

- `<label class="frg-switch">` の中に `<input type="checkbox" role="switch" class="frg-switch-input">` と `children` を置きます。
- `disabled`・`invalid` のときは、`<label>` に `data-disabled`・`data-invalid` を付けます。
- 溝とつまみは、`<input>` のまま（`appearance: none`）背景の色と画像で描いています。要素を足さないので、キーボードでの操作やフォーカスは標準の `<input>` のままです。動きを減らす設定（`prefers-reduced-motion`）では、つまみを動かすアニメーションを止めます。
- react-primitives の `withCheckboxGroup` に組み込むと、スイッチを並べたグループになります（`withCheckboxGroup({ Checkbox: Switch })`）。

| CSS 変数                       | 既定値        | 説明                                     |
| ------------------------------ | ------------- | ---------------------------------------- |
| `--frg-switch-gap`             | `6px`         | スイッチと文字の間隔                     |
| `--frg-switch-width`           | `2em`         | スイッチの幅                             |
| `--frg-switch-height`          | `1.125em`     | スイッチの高さ（つまみの大きさも決まる） |
| `--frg-switch-trackColor`      | `#b8bdc6`     | オフのときの溝の色                       |
| `--frg-switch-checkedColor`    | `#2f6fde`     | オンのときの溝の色                       |
| `--frg-switch-thumbColor`      | `#fff`        | つまみの色                               |
| `--frg-switch-borderColor`     | `transparent` | 溝の枠の色                               |
| `--frg-switch-invalidColor`    | `#d93025`     | `invalid` のときの枠の色                 |
| `--frg-switch-focusColor`      | `#2f6fde`     | キーボードでフォーカスしたときの線の色   |
| `--frg-switch-disabledOpacity` | `0.5`         | `disabled` のときの不透明度              |

### `CheckboxGroup`

```tsx
<CheckboxGroup
  options={options}
  value={value}
  onValueChange={setValue}
  direction="x"
  showSelectAll
  selectAllLabel="すべて"
/>
```

選択肢から並べた、チェックボックスのグループです。react-primitives の `withCheckboxGroup` に、見た目を付けた `Checkbox` を組み込んでいます。プロパティは、react-primitives の `withCheckboxGroup` で作ったコンポーネントのもの（`options`・`value`・`defaultValue`・`onValueChange`・`disabled`・`readOnly`・`invalid`・`unlistedPlacement`・`keepUnlisted`・`selectAllIncludesUnlisted`・`showSelectAll`・`selectAllLabel`）に加えて、次のものを受け取ります。

| プロパティ   | 型           | 説明                                                                                           |
| ------------ | ------------ | ---------------------------------------------------------------------------------------------- |
| `direction?` | `'x' \| 'y'` | 並べる向き。`'y'` は縦に1列、`'x'` は横に並べ、入りきらなければ折り返す。省略すると `'y'`      |
| `gap?`       | `number`     | チェックボックスどうしの間隔（px）。省略すると、`direction` が `'y'` なら `8`、`'x'` なら `16` |

- `<div role="group" class="frg-checkboxgroup">` の中に、チェックボックスを並べます。並べ方は [`@fringeworks/style-layouts`](https://github.com/fringeworks-js/style-layouts) の `stack`（縦）・`flow`（横）を使っています。
- その他のプロパティ（`className`・`style`・`aria-label` など）は `<div>` に渡します。`style` で同じ CSS 変数を指定した場合は、指定した値が優先されます。
- 選択肢外の値（`value` に入っているが `options` に無い値）の扱いや、すべて選ぶの振る舞いは、react-primitives の `useCheckboxGroup` を見てください。
- すべて選ぶ（`showSelectAll`）は、すべての選択肢を操作するものだと分かるよう、親として並べます。縦並びでは選択肢を字下げし、横並びではすべて選ぶを1行目に置いて、選択肢を次の行から並べます。すべて選ぶのチェックボックスには `frg-checkboxgroup-selectall` のクラスが付きます。

| CSS 変数                     | 既定値                                               | 説明                                                                         |
| ---------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--frg-checkboxgroup-indent` | `--frg-checkbox-size` と `--frg-checkbox-gap` の合計 | 縦並びで、すべて選ぶの下の選択肢を字下げする幅（すべて選ぶの文字の位置まで） |

### `RadioGroup`

```tsx
<RadioGroup
  options={[
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
  ]}
  value={size}
  onValueChange={setSize}
  direction="x"
/>
```

選択肢から並べた、ラジオボタンのグループです。react-primitives の `withRadioGroup` に、見た目を付けたラジオボタンを組み込んでいます。プロパティは、react-primitives の `withRadioGroup` で作ったコンポーネントのもの（`options`・`value`・`defaultValue`・`onValueChange`・`disabled`・`readOnly`・`required`・`invalid`・`unlistedPlacement`・`keepUnlisted`）に加えて、`CheckboxGroup` と同じ `direction`・`gap` を受け取ります。

- `value` は選んだ値で、何も選んでいないときは `null` です。選んだものは外せません（HTML のラジオボタンと同じ）。
- `<div role="radiogroup" class="frg-radiogroup">` の中に、`<label class="frg-radio">` と `<input type="radio" class="frg-radio-input">` を並べます。Tab キーでグループに入り、矢印キーで選べます（ブラウザーの標準の動き）。
- `disabled`・`invalid` のときは、`<label>` に `data-disabled`・`data-invalid` を付けます（ラジオボタンには `aria-invalid` を付けられないため、不正の見た目は `<label>` の属性で付けます）。
- その他のプロパティは `<div>` に渡します。
- 選択肢外の値の扱いは、react-primitives の `useRadioGroup` を見てください。選んだ値をラベルで表示するには、react-primitives の `OptionLabel` に同じ `value`・`options`・`unlistedPlacement` を渡します。

| CSS 変数                      | 既定値    | 説明                                   |
| ----------------------------- | --------- | -------------------------------------- |
| `--frg-radio-gap`             | `6px`     | ラジオボタンと文字の間隔               |
| `--frg-radio-size`            | `1em`     | ラジオボタンの大きさ                   |
| `--frg-radio-borderColor`     | `#8a8f98` | 枠の色                                 |
| `--frg-radio-backgroundColor` | `#fff`    | 選んでいないときの背景の色             |
| `--frg-radio-checkedColor`    | `#2f6fde` | 選んだときの背景と枠の色               |
| `--frg-radio-invalidColor`    | `#d93025` | `invalid` のときの枠の色               |
| `--frg-radio-focusColor`      | `#2f6fde` | キーボードでフォーカスしたときの線の色 |
| `--frg-radio-disabledOpacity` | `0.5`     | `disabled` のときの不透明度            |

選んだときの中の点は白で、CSS 変数では変えられません（背景画像で描いているため）。変えたい場合は、`:checked` の `background-image` を上書きしてください。

### `Button`

```tsx
<Button value="save" onMainAction={run}>
  保存
</Button>
```

[react-primitives の `Button`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Button` と同じです（`value`・`onMainAction`・`disabled`・`type` と、`<button>` のプロパティ）。

- 押すと、`value` をそのまま `onMainAction` に渡します。`onClick` で `event.preventDefault()` すると、`onMainAction` は呼びません。
- `type` を省略すると `'button'` です（フォームの中に置いても送信しません）。
- `<button class="frg-button">` を描きます。

| CSS 変数                              | 既定値    | 説明                                       |
| ------------------------------------- | --------- | ------------------------------------------ |
| `--frg-button-paddingX`               | `0.875em` | 左右の余白                                 |
| `--frg-button-paddingY`               | `0.375em` | 上下の余白                                 |
| `--frg-button-gap`                    | `6px`     | 中に並べたもの（アイコンと文字など）の間隔 |
| `--frg-button-borderColor`            | `#8a8f98` | 枠の色                                     |
| `--frg-button-radius`                 | `0.375em` | 角の丸み                                   |
| `--frg-button-backgroundColor`        | `#fff`    | 背景の色                                   |
| `--frg-button-backgroundColor-hover`  | `#f1f3f5` | ホバーしたときの背景の色                   |
| `--frg-button-backgroundColor-active` | `#e3e6ea` | 押しているときの背景の色                   |
| `--frg-button-color`                  | `inherit` | 文字の色                                   |
| `--frg-button-focusColor`             | `#2f6fde` | キーボードでフォーカスしたときの線の色     |
| `--frg-button-disabledOpacity`        | `0.5`     | `disabled` のときの不透明度                |

### `ButtonGroup`

```tsx
<ButtonGroup
  options={[
    { value: 'copy', label: 'コピー' },
    { value: 'delete', label: '削除' },
  ]}
  onMainAction={run}
/>
```

選択肢から並べた、ボタンのグループです。react-primitives の `withButtonGroup` に、見た目を付けた `Button` を組み込んでいます。プロパティは、react-primitives の `withButtonGroup` で作ったコンポーネントのもの（`options`・`onMainAction`・`disabled`）に加えて、次のものを受け取ります。

| プロパティ   | 型           | 説明                                                                                      |
| ------------ | ------------ | ----------------------------------------------------------------------------------------- |
| `direction?` | `'x' \| 'y'` | 並べる向き。`'x'` は横に並べ、入りきらなければ折り返す。`'y'` は縦に1列。省略すると `'x'` |
| `gap?`       | `number`     | ボタンどうしの間隔（px）。省略すると `8`                                                  |

- 押されたボタンの選択肢の `value` を `onMainAction` に渡します。単独の `Button` と、同じハンドラーを使えます。
- `<div role="group" class="frg-buttongroup">` の中に、ボタンを並べます。その他のプロパティは `<div>` に渡します。

### `TextInput`

```tsx
<TextInput value={name} onValueChange={setName} placeholder="名前" />
```

[react-primitives の `TextInput`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `TextInput` と同じです（`value`・`defaultValue`・`onValueChange`・`onInputValueChange`・`valueChangeTiming`・`disabled`・`readOnly`・`required`・`invalid`・`type` と、`<input>` のプロパティ）。

- 既定では、フォーカスが外れたとき・Enter を押したときに確定し、`onValueChange` を呼びます（`valueChangeTiming="input"` なら入力のたび）。IME で変換している間の Enter では確定しません。Esc で、確定した値に戻します。
- `<input class="frg-textinput">` を描きます。幅は決めていないので、クラスや `style` で指定してください。

| CSS 変数                           | 既定値    | 説明                                   |
| ---------------------------------- | --------- | -------------------------------------- |
| `--frg-textinput-paddingX`         | `0.625em` | 左右の余白                             |
| `--frg-textinput-paddingY`         | `0.375em` | 上下の余白                             |
| `--frg-textinput-borderColor`      | `#8a8f98` | 枠の色                                 |
| `--frg-textinput-radius`           | `0.375em` | 角の丸み                               |
| `--frg-textinput-backgroundColor`  | `#fff`    | 背景の色                               |
| `--frg-textinput-color`            | `inherit` | 文字の色                               |
| `--frg-textinput-placeholderColor` | `#8a8f98` | `placeholder` の文字の色               |
| `--frg-textinput-invalidColor`     | `#d93025` | `invalid` のときの枠の色               |
| `--frg-textinput-focusColor`       | `#2f6fde` | キーボードでフォーカスしたときの線の色 |
| `--frg-textinput-disabledOpacity`  | `0.5`     | `disabled` のときの不透明度            |

### `Collapsible`

```tsx
<Collapsible summary="詳しい条件" open={open} onOpenChange={setOpen}>
  …中身…
</Collapsible>
```

[react-primitives の `Collapsible`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Collapsible` と同じです（`open`・`defaultOpen`・`onOpenChange`・`disabled`・`summary`・`children`・`partsProps` と、`<details>` のプロパティ）。

- HTML の `<details>`・`<summary>` で開閉します。ページ内検索で中の文字が見つかると、ブラウザーが開きます（`onOpenChange` も呼びます）。
- `<details class="frg-collapsible">` と `<summary class="frg-collapsible-summary">` を描きます。ブラウザーごとに違う三角の印を消し、CSS で描いた印（›）を置いて、開くと下に向けます。枠や背景は付けません。

| CSS 変数                            | 既定値         | 説明                                   |
| ----------------------------------- | -------------- | -------------------------------------- |
| `--frg-collapsible-gap`             | `6px`          | 印と見出しの間隔                       |
| `--frg-collapsible-markerColor`     | `currentColor` | 印の色                                 |
| `--frg-collapsible-contentGap`      | `8px`          | 開いたときの、見出しと中身の間隔       |
| `--frg-collapsible-focusColor`      | `#2f6fde`      | キーボードでフォーカスしたときの線の色 |
| `--frg-collapsible-disabledOpacity` | `0.5`          | `disabled` のときの見出しの不透明度    |

### `Table`

```tsx
type Member = { id: string; name: string; age: number };

const columns: TableColumn<Member>[] = [
  {
    key: 'name',
    label: '名前',
    renderValue: (props) => <TextInput {...props} />,
  },
  { key: 'age', label: '年齢' },
];

<Table value={members} onValueChange={setMembers} columns={columns} />;
```

[react-primitives の `Table`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Table` と同じです（`columns`・`value`・`defaultValue`・`onValueChange` と、`<table>` のプロパティ）。列の型（`TableColumn`）も react-primitives から import します。

- 行の配列を `value` で受け取り、セルの値が確定したら、変わった後の配列と、変わったセル（`{ type: 'update', path: [id, key] }`）を `onValueChange` で知らせます。行は `id` で見分けます。
- 列の `renderValue` を省略したセルは、値を文字にして表示します。`renderValue` が受け取る props（`value`・`onValueChange`・`aria-labelledby`）は、`TextInput`・`Checkbox` にそのまま渡せます。
- `<table class="frg-table">` を描きます。行の区切りの罫線とセルの余白を付け、見出しを太字・左寄せ（`text-align: start`）にします。幅は決めていないので、クラスや `style` で指定してください。

| CSS 変数                            | 既定値        | 説明                 |
| ----------------------------------- | ------------- | -------------------- |
| `--frg-table-paddingX`              | `0.75em`      | セルの左右の余白     |
| `--frg-table-paddingY`              | `0.5em`       | セルの上下の余白     |
| `--frg-table-borderColor`           | `#d5d8dd`     | 行の区切りの罫線の色 |
| `--frg-table-color`                 | `inherit`     | 文字の色             |
| `--frg-table-headerBorderColor`     | `#8a8f98`     | 見出しの下の罫線の色 |
| `--frg-table-headerBackgroundColor` | `transparent` | 見出しの背景の色     |
| `--frg-table-headerFontWeight`      | `600`         | 見出しの文字の太さ   |

### `RecordFields`

```tsx
const fields: RecordField<Member>[] = [
  { key: 'id', label: 'ID' },
  {
    key: 'name',
    label: '名前',
    renderValue: (props) => <TextInput {...props} />,
  },
  {
    key: 'active',
    label: '有効',
    renderValue: (props) => <Checkbox {...props} />,
  },
];

<RecordFields value={member} onValueChange={setMember} fields={fields} />;
```

[react-primitives の `RecordFields`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `RecordFields` と同じです（`fields`・`value`・`defaultValue`・`onValueChange` と、`<div>` のプロパティ）。項目の型（`RecordField`）も react-primitives から import します。

- レコードを `value` で受け取り、項目の値が確定したら、変わった後のレコードと、変わった項目（`{ type: 'update', path: [key] }`）を `onValueChange` で知らせます。送信（`<form>`）は持ちません。
- 項目の `renderValue` を省略すると、値を文字にして表示します。`renderValue` が受け取る props は、`TextInput`・`Checkbox`・`RadioGroup` などにそのまま渡せます。項目の配列は、`Table` の `columns` にもそのまま渡せます。
- `<div class="frg-recordfields">` の中に項目を縦に並べ、ラベルを値の上に置きます。ラベルは太字にします。幅は決めていないので、クラスや `style` で指定してください。

| CSS 変数                             | 既定値    | 説明               |
| ------------------------------------ | --------- | ------------------ |
| `--frg-recordfields-gap`             | `12px`    | 項目の間隔         |
| `--frg-recordfields-labelGap`        | `4px`     | ラベルと値の間隔   |
| `--frg-recordfields-labelColor`      | `inherit` | ラベルの文字の色   |
| `--frg-recordfields-labelFontWeight` | `600`     | ラベルの文字の太さ |

### 型

| 型                      | 説明                         |
| ----------------------- | ---------------------------- |
| `CheckboxGroupProps<V>` | `CheckboxGroup` のプロパティ |
| `RadioGroupProps<V>`    | `RadioGroup` のプロパティ    |
| `ButtonGroupProps<V>`   | `ButtonGroup` のプロパティ   |

## ライセンス

MIT
