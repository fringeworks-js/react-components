import getComponentName from '../_internal/_getComponentName';
import {
  type CheckboxIndicatorComponent,
  withCheckboxIndicator,
} from '../Checkbox';
import createCheckboxGroup from './_createCheckboxGroup';
import type { CheckboxGroupComponent } from './types';

/**
 * チェックボックスの印（`Indicator`）を差し替えた、見た目を付けたチェックボックスグループを作る HOC
 *
 * 選択肢とすべて選ぶのチェックボックスを、`withCheckboxIndicator(Indicator)` で作ったチェックボックスで描く。
 * 作ったグループは `CheckboxGroup` と同じプロパティを受け取る。アプリで1回作り、画面ではそのまま置く。
 *
 * @example
 * export const AppCheckboxGroup = withCheckboxGroupIndicator(CheckboxSymbol);
 *
 * @param Indicator 印の部品（`withCheckboxIndicator` と同じもの）
 * @returns 印を差し替えたチェックボックスグループ
 */
export default function withCheckboxGroupIndicator<
  I extends CheckboxIndicatorComponent,
>(Indicator: I): CheckboxGroupComponent<I> {
  return createCheckboxGroup(
    withCheckboxIndicator(Indicator),
    `withCheckboxGroupIndicator(${getComponentName(Indicator)})`,
  );
}
