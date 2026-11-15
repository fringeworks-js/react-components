import createRadio from './_createRadio';
import RadioIndicator from './_RadioIndicator';

/**
 * 見た目を付けたラジオボタン（RadioGroup に組み込む。単独では公開しない）
 *
 * react-primitives の `withRadio` に、見た目を付けた印（`Indicator`）を組み込んだもの。
 */
const Radio = createRadio(RadioIndicator);

export default Radio;
