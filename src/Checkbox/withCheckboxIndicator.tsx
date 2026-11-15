import getComponentName from '../_internal/_getComponentName';
import createCheckbox from './_createCheckbox';
import type { CheckboxComponent, CheckboxIndicatorComponent } from './types';

/**
 * 印（`Indicator`）を差し替えた、見た目を付けたチェックボックスを作る HOC
 *
 * 作ったチェックボックスは `Checkbox` と同じプロパティを受け取る。アプリで1回作り、画面ではそのまま置く。
 * 印は、react-primitives の `CheckboxIndicatorSlotProps`（`checked`・`indeterminate` などの状態）を受け取り、状態に合わせて描く部品。
 * 受け取った `className`（土台のクラス `frg-checkbox-indicator`）と `data-*`（状態の属性）を要素に渡す必要がある。
 * 差し替えた印には、既定の印の箱（枠・背景・角の丸み）の見た目は付かない。
 *
 * @example
 * export const AppCheckbox = withCheckboxIndicator(CheckboxSymbol);
 *
 * @param Indicator 印の部品
 * @returns 印を差し替えたチェックボックス
 */
export default function withCheckboxIndicator<
  I extends CheckboxIndicatorComponent,
>(Indicator: I): CheckboxComponent<I> {
  return createCheckbox(
    Indicator,
    `withCheckboxIndicator(${getComponentName(Indicator)})`,
  );
}
