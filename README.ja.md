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

見た目は、デザインシステムに寄せない中立なもので、次の方法で調整できます。

1. **プロパティ**: 並べ方や間隔など、レイアウトに関わるもの（`CheckboxGroup` の `direction`・`gap` など）
2. **`design`**: 色・大きさなどを、CSS を書かずに型付きの値で渡す（各コンポーネントの表）
3. **CSS 変数**: `design` と同じ値を、CSS で設定する
4. **CSS のクラス**: コンポーネントの CSS は詳細度が 0（`:where()`）なので、自分のクラス1つで、どのプロパティも上書きできます

```tsx
<Checkbox
  design={{
    gap: 8,
    indicator: {
      size: 18,
      backgroundColor: { checked: '#0a7d4f' },
      borderColor: { checked: '#0a7d4f' },
    },
  }}
/>
```

```css
/* 同じ値を CSS 変数で */
.my-checkbox {
  --frg-checkbox-gap: 8px;
  --frg-checkbox-indicator-size: 18px;
  --frg-checkbox-indicator-backgroundColor-checked: #0a7d4f;
  --frg-checkbox-indicator-borderColor-checked: #0a7d4f;
}
```

`design` の値は、[`@fringeworks/react-contract`](https://github.com/fringeworks-js/react-contract) の `createDesignStyle` の規則で書きます。どのコンポーネントでも同じ書き方です。

- キーは CSS のプロパティ名（`backgroundColor` など）で、部品の中の部分（`indicator` など）のものは部分の名前の下に書きます。
- 値は1つの値（すべての状態に効く）か、状態ごとのオブジェクト（`{ base, hover, checked, … }`）です。省略した状態は、コンポーネントの既定の値のままです。表の `opacity.disabled` などは、状態ごとのオブジェクトの `disabled` に当たります。
- 長さの数値は px です。どの値にも `var(--…)` を渡せるので、テーマの仕組みの CSS 変数につなげます。
- `design` は、ルートの要素の `style` に CSS 変数として設定します。`style` で同じ変数を指定したら、そちらを優先します。同じ要素にクラスで設定した変数より強いので、デザイナーが CSS で調整する変数と重ならないようにしてください。

アプリで共通のデザインは、[`@fringeworks/react-contract`](https://github.com/fringeworks-js/react-contract) の `withDesign` で、アプリで1回だけ決められます。使う場所の `design` は、`withDesign` で決めた値より優先します。どの部品も、静的なプロパティ `designDefinition` にデザインの定義を持っています。

```tsx
import { withDesign } from '@fringeworks/react-contract';

// アプリで1回だけ作る
export const AppCheckbox = withDesign(Checkbox, {
  indicator: { backgroundColor: { checked: 'var(--brand-accent)' } },
});
```

### デザインの値を作る

1つ1つのデザインの値を決めずに、メインの色・角の丸み・詰め具合などから、見栄えのする値を作れます。部品ごとに `create<名前>Design` があり、同じ入力をどの部品にも渡せます。印の色（白か黒）や、薄い色のときの枠の色などは自動で決まります。渡さなかった値の部分は、既定の見た目のままです。

```tsx
const brand = {
  primaryColor: '#0a7d5a',
  errorColor: '#b42318',
  radius: 8,
  scaling: 0.9,
} as const;

<Checkbox design={createCheckboxDesign(brand)}>同意する</Checkbox>;

// withDesign と組み合わせて、アプリで1回だけ決める
export const AppButton = withDesign(Button, createButtonDesign(brand));
```

```ts
create<名前>Design(options: CreateDesignOptions): <名前>Design
```

入力（`CreateDesignOptions`）は [react-contract の `createDesign`](https://github.com/fringeworks-js/react-contract) と同じで、`primaryColor`・`primaryContrastColor`・`errorColor`・`neutralColor`・`radius`・`scaling` です。どれも省略できます。各関数は、部品の既定の割り当て（定数 `<名前>DesignTemplate`）で `createDesign` を呼びます。割り当てを変えたいときは、`createDesign` に自分の割り当てを渡します。

| 関数                       | 入力の使い道                                                                                                                                                                                                                                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createCheckboxDesign`     | `primaryColor`: `checked`・`indeterminate` の印の背景・枠、フォーカスの線 / `primaryContrastColor`: 印（✓・−）の色 / `neutralColor`: チェックしていないときの枠 / `errorColor`: `invalid` の枠 / `radius`: 印の角の丸み（半分にし、`0.3em` より丸くしない） / `scaling`: 印と文字の間隔・印の大きさ |
| `createRadioDesign`        | `primaryColor`: 選んだ印の背景・枠、フォーカスの線 / `primaryContrastColor`: 中の点の色 / `neutralColor`: 選んでいないときの枠 / `errorColor`: `invalid` の枠 / `scaling`: 印と文字の間隔・印の大きさ（印は円なので `radius` は使わない）。`RadioGroup` の `partsProps.radio.design` に渡す         |
| `createSwitchDesign`       | `primaryColor`: オンの溝、フォーカスの線 / `primaryContrastColor`: オンのつまみ / `neutralColor`: オフの溝（白に寄せた色） / `errorColor`: `invalid` の枠 / `scaling`: 間隔・溝の幅と高さ（溝は丸いので `radius` は使わない）                                                                       |
| `createButtonDesign`       | `primaryColor`: フォーカスの線（Button はメインの色で塗らない） / `neutralColor`: 枠、hover・active の背景（白に寄せた色） / `radius`: 角の丸み / `scaling`: 間隔・左右と上下の余白                                                                                                                 |
| `createTextInputDesign`    | `primaryColor`: フォーカスの線 / `neutralColor`: 枠・プレースホルダー / `errorColor`: `invalid` の枠 / `radius`: 角の丸み / `scaling`: 左右と上下の余白                                                                                                                                             |
| `createCollapsibleDesign`  | `primaryColor`: 見出しのフォーカスの線 / `scaling`: 見出しと中身の間隔・印と見出しの文字の間隔                                                                                                                                                                                                      |
| `createTableDesign`        | `neutralColor`: 見出しの行の線、データの行の線（白に寄せた色） / `scaling`: セルの左右と上下の余白                                                                                                                                                                                                  |
| `createRecordFieldsDesign` | `scaling`: 項目の間隔・見出しと値の間隔                                                                                                                                                                                                                                                             |

- 枠とフォーカスの線に使うメインの色は、白とのコントラスト比が 3 に届かない薄い色なら、届くまで暗くします（背景はメインの色のまま）。
- メインの色の上に置く色（`primaryContrastColor`）を省略すると、白とのコントラスト比が 3 以上なら白、そうでなければ白と黒の読みやすい方にします。
- 灰色を白に寄せる割合は、既定の灰色（`#8a8f98`）を `neutralColor` に渡したときに、既定の見た目に近くなるようにしています。
- `radius` を大きくする（`9999` など）と、Button・TextInput はピル型になります。チェックボックスの印は、ラジオボタンと紛らわしくならないよう `0.3em` で止まります。

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

[react-primitives の `Checkbox`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Checkbox` と同じです（`value`・`defaultValue`・`onValueChange`・`disabled`・`readOnly`・`required`・`invalid`・`indeterminate`・`children`・`partsProps`）。加えて、デザインの値を `design` で受け取ります（下の表）。

- `<label class="frg-checkbox">` の中に、`<input type="checkbox" class="frg-checkbox-input">`、印の `<span class="frg-checkbox-indicator">`、`children` を置きます。
- `disabled`・`invalid` のときは、`<label>` に `data-disabled`・`data-invalid` を付けます。
- ブラウザーによる見た目の差をなくすため、`<input>` は視覚的に隠し、印（`Indicator`）でチェックの状態を描きます。キーボードでの操作やフォーカスは、標準の `<input>` のままです（フォーカスの線は印に描きます）。印は、react-primitives の `withCheckbox` の `Indicator` で、任意のコンポーネントに差し替えられます。

`design` で渡せるデザインの値です（CSS 変数は `--frg-checkbox-` の後にキーを `-` でつないだもの。例: `indicator.outlineColor.focus` → `--frg-checkbox-indicator-outlineColor-focus`）。

| キー                           | 既定値    | 説明                                                                          |
| ------------------------------ | --------- | ----------------------------------------------------------------------------- |
| `gap`                          | `6px`     | 印と文字の間隔                                                                |
| `color`                        | `inherit` | 文字の色                                                                      |
| `opacity.disabled`             | `0.5`     | `disabled` のときの不透明度                                                   |
| `indicator.size`               | `1em`     | 印の大きさ                                                                    |
| `indicator.borderRadius`       | `0.25em`  | 印の角の丸み                                                                  |
| `indicator.borderColor`        | `#8a8f98` | 印の枠の色（`checked`・`indeterminate` は `#2f6fde`、`invalid` は `#d93025`） |
| `indicator.backgroundColor`    | `#fff`    | 印の背景の色（`checked`・`indeterminate` は `#2f6fde`）                       |
| `indicator.color`              | `#fff`    | 印（✓・−）の色（`checked`・`indeterminate`）                                  |
| `indicator.outlineColor.focus` | `#2f6fde` | キーボードでフォーカスしたときの線の色                                        |

### `Switch`

```tsx
<Switch value={enabled} onValueChange={setEnabled}>
  通知を受け取る
</Switch>
```

[react-primitives の `Switch`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Switch` と同じです（`Checkbox` から `indeterminate` を除いたもの）。加えて、デザインの値を `design` で受け取ります（下の表）。

- `<label class="frg-switch">` の中に、`<input type="checkbox" role="switch" class="frg-switch-input">`、溝の `<span class="frg-switch-indicator">`（中につまみの `<span class="frg-switch-thumb">`）、`children` を置きます。
- `disabled`・`invalid` のときは、`<label>` に `data-disabled`・`data-invalid` を付けます。
- `<input>` は視覚的に隠し、溝とつまみ（`Indicator`）でオン・オフを描きます。キーボードでの操作やフォーカスは、標準の `<input>` のままです。動きを減らす設定（`prefers-reduced-motion`）では、つまみを動かしません。
- react-primitives の `withCheckboxGroup` に組み込むと、スイッチを並べたグループになります（`withCheckboxGroup({ Checkbox: Switch })`）。

`design` で渡せるデザインの値です（CSS 変数は `--frg-switch-` の後にキーを `-` でつないだもの。例: `thumb.backgroundColor` → `--frg-switch-thumb-backgroundColor`）。

| キー                           | 既定値        | 説明                                   |
| ------------------------------ | ------------- | -------------------------------------- |
| `gap`                          | `6px`         | スイッチと文字の間隔                   |
| `color`                        | `inherit`     | 文字の色                               |
| `opacity.disabled`             | `0.5`         | `disabled` のときの不透明度            |
| `indicator.width`              | `2em`         | 溝の幅                                 |
| `indicator.height`             | `1.125em`     | 溝の高さ（つまみの大きさも決まる）     |
| `indicator.backgroundColor`    | `#b8bdc6`     | 溝の色（`checked` は `#2f6fde`）       |
| `indicator.borderColor`        | `transparent` | 溝の枠の色（`invalid` は `#d93025`）   |
| `indicator.outlineColor.focus` | `#2f6fde`     | キーボードでフォーカスしたときの線の色 |
| `thumb.backgroundColor`        | `#fff`        | つまみの色（`checked` も同じ）         |

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

| CSS 変数                     | 既定値                                                         | 説明                                                                         |
| ---------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--frg-checkboxgroup-indent` | `--frg-checkbox-indicator-size` と `--frg-checkbox-gap` の合計 | 縦並びで、すべて選ぶの下の選択肢を字下げする幅（すべて選ぶの文字の位置まで） |

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
- `<div role="radiogroup" class="frg-radiogroup">` の中に、`<label class="frg-radio">` を並べます。`<label>` の中は、視覚的に隠した `<input type="radio" class="frg-radio-input">`、印の `<span class="frg-radio-indicator">`、文字です。Tab キーでグループに入り、矢印キーで選べます（ブラウザーの標準の動き）。
- `disabled`・`invalid` のときは、`<label>` に `data-disabled`・`data-invalid` を付けます（ラジオボタンには `aria-invalid` を付けられないため、不正の見た目は `<label>` の属性で付けます）。
- その他のプロパティは `<div>` に渡します。
- 選択肢外の値の扱いは、react-primitives の `useRadioGroup` を見てください。選んだ値をラベルで表示するには、react-primitives の `OptionLabel` に同じ `value`・`options`・`unlistedPlacement` を渡します。

中のラジオボタンのデザインの値は `partsProps.radio.design` で渡せます（下の表。CSS 変数は `--frg-radio-` の後にキーを `-` でつないだもの）。

| キー                           | 既定値    | 説明                                                         |
| ------------------------------ | --------- | ------------------------------------------------------------ |
| `gap`                          | `6px`     | ラジオボタンと文字の間隔                                     |
| `color`                        | `inherit` | 文字の色                                                     |
| `opacity.disabled`             | `0.5`     | `disabled` のときの不透明度                                  |
| `indicator.size`               | `1em`     | 印の大きさ                                                   |
| `indicator.borderColor`        | `#8a8f98` | 印の枠の色（`checked` は `#2f6fde`、`invalid` は `#d93025`） |
| `indicator.backgroundColor`    | `#fff`    | 印の背景の色（`checked` は `#2f6fde`）                       |
| `indicator.color`              | `#fff`    | 選んだときの中の点の色（`checked`）                          |
| `indicator.outlineColor.focus` | `#2f6fde` | キーボードでフォーカスしたときの線の色                       |

### `Button`

```tsx
<Button value="save" onMainAction={run}>
  保存
</Button>
```

[react-primitives の `Button`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Button` と同じです（`value`・`onMainAction`・`disabled`・`type` と、`<button>` のプロパティ）。加えて、デザインの値を `design` で受け取ります（下の表）。

- 押すと、`value` をそのまま `onMainAction` に渡します。`onClick` で `event.preventDefault()` すると、`onMainAction` は呼びません。
- `type` を省略すると `'button'` です（フォームの中に置いても送信しません）。
- `<button class="frg-button">` を描きます。

`design` で渡せるデザインの値です（CSS 変数は `--frg-button-` の後にキーを `-` でつないだもの。例: `outlineColor.focus` → `--frg-button-outlineColor-focus`）。

| キー                 | 既定値    | 説明                                                    |
| -------------------- | --------- | ------------------------------------------------------- |
| `gap`                | `6px`     | 中に並べたもの（アイコンと文字など）の間隔              |
| `color`              | `inherit` | 文字の色                                                |
| `backgroundColor`    | `#fff`    | 背景の色（`hover` は `#f1f3f5`、`active` は `#e3e6ea`） |
| `borderColor`        | `#8a8f98` | 枠の色                                                  |
| `borderRadius`       | `0.375em` | 角の丸み                                                |
| `paddingX`           | `0.875em` | 左右の余白                                              |
| `paddingY`           | `0.375em` | 上下の余白                                              |
| `opacity.disabled`   | `0.5`     | `disabled` のときの不透明度                             |
| `outlineColor.focus` | `#2f6fde` | キーボードでフォーカスしたときの線の色                  |

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

[react-primitives の `TextInput`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `TextInput` と同じです（`value`・`defaultValue`・`onValueChange`・`onInputValueChange`・`valueChangeTiming`・`disabled`・`readOnly`・`required`・`invalid`・`type` と、`<input>` のプロパティ）。加えて、デザインの値を `design` で受け取ります（下の表）。

- 既定では、フォーカスが外れたとき・Enter を押したときに確定し、`onValueChange` を呼びます（`valueChangeTiming="input"` なら入力のたび）。IME で変換している間の Enter では確定しません。Esc で、確定した値に戻します。
- `<input class="frg-textinput">` を描きます。幅は決めていないので、クラスや `style` で指定してください。

`design` で渡せるデザインの値です（CSS 変数は `--frg-textinput-` の後にキーを `-` でつないだもの。例: `placeholder.color` → `--frg-textinput-placeholder-color`）。

| キー                 | 既定値    | 説明                                   |
| -------------------- | --------- | -------------------------------------- |
| `color`              | `inherit` | 文字の色                               |
| `backgroundColor`    | `#fff`    | 背景の色                               |
| `borderColor`        | `#8a8f98` | 枠の色（`invalid` は `#d93025`）       |
| `borderRadius`       | `0.375em` | 角の丸み                               |
| `paddingX`           | `0.625em` | 左右の余白                             |
| `paddingY`           | `0.375em` | 上下の余白                             |
| `opacity.disabled`   | `0.5`     | `disabled` のときの不透明度            |
| `outlineColor.focus` | `#2f6fde` | キーボードでフォーカスしたときの線の色 |
| `placeholder.color`  | `#8a8f98` | `placeholder` の文字の色               |

### `Collapsible`

```tsx
<Collapsible summary="詳しい条件" open={open} onOpenChange={setOpen}>
  …中身…
</Collapsible>
```

[react-primitives の `Collapsible`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Collapsible` と同じです（`open`・`defaultOpen`・`onOpenChange`・`disabled`・`summary`・`children`・`partsProps` と、`<details>` のプロパティ）。加えて、デザインの値を `design` で受け取ります（下の表）。

- HTML の `<details>`・`<summary>` で開閉します。ページ内検索で中の文字が見つかると、ブラウザーが開きます（`onOpenChange` も呼びます）。
- `<details class="frg-collapsible">` と `<summary class="frg-collapsible-summary">` を描きます。ブラウザーごとに違う三角の印を消し、見出しの前に印の `<span class="frg-collapsible-indicator">`（›）を置いて、開くと下に向けます。枠や背景は付けません。

`design` で渡せるデザインの値です（CSS 変数は `--frg-collapsible-` の後にキーを `-` でつないだもの。例: `indicator.color` → `--frg-collapsible-indicator-color`）。

| キー                         | 既定値         | 説明                                   |
| ---------------------------- | -------------- | -------------------------------------- |
| `gap`                        | `8px`          | 開いたときの、見出しと中身の間隔       |
| `summary.gap`                | `6px`          | 印と見出しの間隔                       |
| `summary.opacity.disabled`   | `0.5`          | `disabled` のときの見出しの不透明度    |
| `summary.outlineColor.focus` | `#2f6fde`      | キーボードでフォーカスしたときの線の色 |
| `indicator.color`            | `currentColor` | 印（›）の色                            |

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

[react-primitives の `Table`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `Table` と同じです（`columns`・`value`・`defaultValue`・`onValueChange`・`renderRow`・`partsProps` と、`<table>` のプロパティ）。列の型（`TableColumn`）も react-primitives から import します。加えて、デザインの値を `design` で受け取ります（下の表）。

- 行の配列を `value` で受け取り、セルの値が確定したら、変わった後の配列と、変わったセル（`{ type: 'update', path: [id, key] }`）を `onValueChange` で知らせます。行は `id` で見分けます。
- 列の `renderValue` を省略したセルは、値を文字にして表示します。`renderValue` が受け取る props（`value`・`onValueChange`・`aria-labelledby`）は、`TextInput`・`Checkbox` にそのまま渡せます。
- `<table class="frg-table">` を描きます。行の区切りの罫線とセルの余白を付け、見出しを太字・左寄せ（`text-align: start`）にします。幅は決めていないので、クラスや `style` で指定してください。

`design` で渡せるデザインの値です（CSS 変数は `--frg-table-` の後にキーを `-` でつないだもの。例: `cell.borderColor` → `--frg-table-cell-borderColor`）。

| キー                         | 既定値        | 説明                     |
| ---------------------------- | ------------- | ------------------------ |
| `color`                      | `inherit`     | 文字の色                 |
| `headerCell.paddingX`        | `0.75em`      | 見出しのセルの左右の余白 |
| `headerCell.paddingY`        | `0.5em`       | 見出しのセルの上下の余白 |
| `headerCell.borderColor`     | `#8a8f98`     | 見出しの下の罫線の色     |
| `headerCell.backgroundColor` | `transparent` | 見出しの背景の色         |
| `headerCell.fontWeight`      | `600`         | 見出しの文字の太さ       |
| `cell.paddingX`              | `0.75em`      | セルの左右の余白         |
| `cell.paddingY`              | `0.5em`       | セルの上下の余白         |
| `cell.borderColor`           | `#d5d8dd`     | 行の区切りの罫線の色     |

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

[react-primitives の `RecordFields`](https://github.com/fringeworks-js/react-primitives) に、見た目を付けたものです。プロパティは react-primitives の `RecordFields` と同じです（`fields`・`value`・`defaultValue`・`onValueChange`・`partsProps` と、`<div>` のプロパティ）。項目の型（`RecordField`）も react-primitives から import します。加えて、デザインの値を `design` で受け取ります（下の表）。

- レコードを `value` で受け取り、項目の値が確定したら、変わった後のレコードと、変わった項目（`{ type: 'update', path: [key] }`）を `onValueChange` で知らせます。送信（`<form>`）は持ちません。
- 項目の `renderValue` を省略すると、値を文字にして表示します。`renderValue` が受け取る props は、`TextInput`・`Checkbox`・`RadioGroup` などにそのまま渡せます。項目の配列は、`Table` の `columns` にもそのまま渡せます。
- `<div class="frg-recordfields">` の中に項目を縦に並べ、ラベルを値の上に置きます。ラベルは太字にします。幅は決めていないので、クラスや `style` で指定してください。

`design` で渡せるデザインの値です（CSS 変数は `--frg-recordfields-` の後にキーを `-` でつないだもの。例: `label.fontWeight` → `--frg-recordfields-label-fontWeight`）。

| キー               | 既定値    | 説明               |
| ------------------ | --------- | ------------------ |
| `gap`              | `12px`    | 項目の間隔         |
| `field.gap`        | `4px`     | ラベルと値の間隔   |
| `label.color`      | `inherit` | ラベルの文字の色   |
| `label.fontWeight` | `600`     | ラベルの文字の太さ |

### 型

| 型                      | 説明                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| `CheckboxGroupProps<V>` | `CheckboxGroup` のプロパティ                                      |
| `RadioGroupProps<V>`    | `RadioGroup` のプロパティ                                         |
| `ButtonGroupProps<V>`   | `ButtonGroup` のプロパティ                                        |
| `CheckboxProps`         | `Checkbox` のプロパティ                                           |
| `SwitchProps`           | `Switch` のプロパティ                                             |
| `ButtonProps<V>`        | `Button` のプロパティ                                             |
| `TextInputProps`        | `TextInput` のプロパティ                                          |
| `CollapsibleProps`      | `Collapsible` のプロパティ                                        |
| `TableProps<R>`         | `Table` のプロパティ                                              |
| `RecordFieldsProps<T>`  | `RecordFields` のプロパティ                                       |
| `RadioProps`            | `RadioGroup` の中のラジオボタンのプロパティ（`partsProps.radio`） |
| `CheckboxDesign`        | `Checkbox` の `design` の値                                       |
| `SwitchDesign`          | `Switch` の `design` の値                                         |
| `ButtonDesign`          | `Button` の `design` の値                                         |
| `TextInputDesign`       | `TextInput` の `design` の値                                      |
| `CollapsibleDesign`     | `Collapsible` の `design` の値                                    |
| `TableDesign`           | `Table` の `design` の値                                          |
| `RecordFieldsDesign`    | `RecordFields` の `design` の値                                   |
| `RadioDesign`           | `RadioGroup` の中のラジオボタンの `design` の値                   |

デザインの定義（受け付けるキーと、効く状態）は、定数 `checkboxDesignDefinition`・`switchDesignDefinition`・`buttonDesignDefinition`・`textInputDesignDefinition`・`collapsibleDesignDefinition`・`tableDesignDefinition`・`recordFieldsDesignDefinition`・`radioDesignDefinition` として export しています（react-contract の `DesignDefinition`）。`create<名前>Design` が使う既定の割り当ては、定数 `checkboxDesignTemplate`・`switchDesignTemplate`・`buttonDesignTemplate`・`textInputDesignTemplate`・`collapsibleDesignTemplate`・`tableDesignTemplate`・`recordFieldsDesignTemplate`・`radioDesignTemplate` として export しています（react-contract の `DesignTemplate`）。

## ライセンス

MIT
