import getComponentName from '../_internal/_getComponentName';
import createRadio from './_createRadio';
import createRadioGroup from './_createRadioGroup';
import type { RadioGroupComponent, RadioIndicatorComponent } from './types';

/**
 * ラジオボタンの印（`Indicator`）を差し替えた、見た目を付けたラジオグループを作る HOC
 *
 * 作ったグループは `RadioGroup` と同じプロパティを受け取る。アプリで1回作り、画面ではそのまま置く。
 * 印は、react-primitives の `RadioIndicatorSlotProps`（`checked` などの状態）を受け取り、状態に合わせて描く部品。
 * 受け取った `className`（土台のクラス `frg-radio-indicator`）と `data-*`（状態の属性）を要素に渡す必要がある。
 * 差し替えた印には、既定の印の箱（枠・背景）の見た目は付かない。
 *
 * @example
 * export const AppRadioGroup = withRadioGroupIndicator(RadioSymbol);
 *
 * @param Indicator 印の部品
 * @returns 印を差し替えたラジオグループ
 */
export default function withRadioGroupIndicator<
  I extends RadioIndicatorComponent,
>(Indicator: I): RadioGroupComponent<I> {
  return createRadioGroup(
    createRadio(Indicator),
    `withRadioGroupIndicator(${getComponentName(Indicator)})`,
  );
}
