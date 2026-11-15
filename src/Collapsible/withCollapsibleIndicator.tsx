import getComponentName from '../_internal/_getComponentName';
import createCollapsible from './_createCollapsible';
import type {
  CollapsibleComponent,
  CollapsibleIndicatorComponent,
} from './types';

/**
 * 開閉の印（`Indicator`）を差し替えた、見た目を付けた折りたためる部品を作る HOC
 *
 * 作った部品は `Collapsible` と同じプロパティを受け取る。アプリで1回作り、画面ではそのまま置く。
 * 印は、react-primitives の `CollapsibleIndicatorSlotProps`（`open`・`disabled`）を受け取り、状態に合わせて描く部品
 * （開いたときに向きを変えるなどは、印が自分で描き分ける）。
 * 受け取った `className`（土台のクラス `frg-collapsible-indicator`）と `data-*`（状態の属性）を要素に渡す必要がある。
 * 差し替えた印には、既定の印（›）の形と、開いたときに回す見た目は付かない。
 *
 * @example
 * export const AppCollapsible = withCollapsibleIndicator(ExpandSymbol);
 *
 * @param Indicator 開閉の印の部品
 * @returns 印を差し替えた折りたためる部品
 */
export default function withCollapsibleIndicator<
  I extends CollapsibleIndicatorComponent,
>(Indicator: I): CollapsibleComponent<I> {
  return createCollapsible(
    Indicator,
    `withCollapsibleIndicator(${getComponentName(Indicator)})`,
  );
}
