import createButton from './_createButton';

/**
 * 見た目を付けたボタン
 *
 * react-primitives の `Button` に、`frg-button` のクラスを付ける。
 * `design` の値は、`<button>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `button.css`）を読み込むと付く。
 * アイコンを置くときは、`withButtonIcon` でアイコンの部品を組み込んだボタンを作る。
 */
const Button = createButton({}, 'Button');

export default Button;
