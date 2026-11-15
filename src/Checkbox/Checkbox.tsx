import CheckboxIndicator from './_CheckboxIndicator';
import createCheckbox from './_createCheckbox';

/**
 * 見た目を付けたチェックボックス
 *
 * react-primitives の `withCheckbox` に、見た目を付けた印（`Indicator`）を組み込み、`frg-checkbox` のクラスと
 * 状態の属性（`data-disabled`・`data-invalid`）を付ける。`<input>` は視覚的に隠し、印で状態を見せる。
 * `design` の値は、ルートの `<label>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `checkbox.css`）を読み込むと付く。
 * 印を差し替えるときは、`withCheckboxIndicator` で作る。
 */
const Checkbox = createCheckbox(CheckboxIndicator, 'Checkbox');

export default Checkbox;
