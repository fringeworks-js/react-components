import Checkbox from '../Checkbox';
import createCheckboxGroup from './_createCheckboxGroup';

/**
 * 見た目を付けたチェックボックスグループ
 *
 * react-primitives の `withCheckboxGroup` に、見た目を付けた `Checkbox` を組み込み、
 * 入れ物に `frg-checkboxgroup` のクラスと、並べ方（style-layouts の `stack`・`flow`）を付ける。
 * 見た目は `styles.css`（または `checkboxgroup.css`）を読み込むと付く。
 * チェックボックスの印を差し替えるときは、`withCheckboxGroupIndicator` で作る。
 */
const CheckboxGroup = createCheckboxGroup(Checkbox, 'CheckboxGroup');

export default CheckboxGroup;
