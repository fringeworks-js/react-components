import createRadioGroup from './_createRadioGroup';
import Radio from './_Radio';

/**
 * 見た目を付けたラジオグループ
 *
 * react-primitives の `withRadioGroup` に、見た目を付けたラジオボタンを組み込み、
 * 入れ物に `frg-radiogroup` のクラスと、並べ方（style-layouts の `stack`・`flow`）を付ける。
 * 見た目は `styles.css`（または `radiogroup.css`）を読み込むと付く。
 * ラジオボタンの印を差し替えるときは、`withRadioGroupIndicator` で作る。
 */
const RadioGroup = createRadioGroup(Radio, 'RadioGroup');

export default RadioGroup;
