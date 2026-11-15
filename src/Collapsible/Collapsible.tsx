import CollapsibleIndicator from './_CollapsibleIndicator';
import createCollapsible from './_createCollapsible';

/**
 * 見た目を付けた、折りたためる部品
 *
 * react-primitives の `withCollapsible` に、見た目を付けた開閉の印（`Indicator`）を組み込み、`frg-collapsible` のクラスと、
 * 見出しの `frg-collapsible-summary` のクラスを付ける。`design` の値は、ルートの `<details>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `collapsible.css`）を読み込むと付く。
 * 開閉の印を差し替えるときは、`withCollapsibleIndicator` で作る。
 */
const Collapsible = createCollapsible(CollapsibleIndicator, 'Collapsible');

export default Collapsible;
