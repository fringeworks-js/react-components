import clsx from 'clsx';
import type { ElementType, ReactElement } from 'react';

/**
 * 印の状態のうち、`data-*` の属性にするもの（属性の名前は小文字にする。例: `readOnly` → `data-readonly`）
 */
const STATE_KEYS = [
  'checked',
  'indeterminate',
  'open',
  'disabled',
  'readOnly',
  'invalid',
] as const;

/**
 * 印の部品が受け取る props（Checkbox・Radio・Collapsible の印の口の props を広げたもの）
 */
type IndicatorPartProps = {
  className?: string;
} & Partial<Record<(typeof STATE_KEYS)[number], boolean>> &
  Record<string, unknown>;

/**
 * 印の部品を包み、土台のクラス（`frg-checkbox-indicator` など）と状態の属性（`data-checked` など）を付ける
 *
 * 既定の印も差し替えた印も、これで包んで react-primitives の HOC に組み込む。
 * どの印にも同じクラスと属性が付くので、フォーカスの線や状態ごとの色を CSS で共通に書ける。
 * 状態の属性は、口の props にある状態（`checked`・`indeterminate`・`open`・`disabled`・`readOnly`・`invalid`）のうち、
 * `true` のものだけを付ける。印の部品は、受け取った `className`・`data-*` を要素に渡す必要がある。
 *
 * @param className 土台のクラス
 * @param Indicator 包む印の部品
 * @returns react-primitives の HOC に組み込む印の部品
 */
export default function createIndicatorPart(
  className: string,
  Indicator: ElementType,
) {
  function IndicatorPart({
    className: receivedClassName,
    ...props
  }: IndicatorPartProps): ReactElement {
    const stateAttributes: Record<string, true | undefined> = {};
    for (const key of STATE_KEYS) {
      stateAttributes[`data-${key.toLowerCase()}`] = props[key] || undefined;
    }
    return (
      <Indicator
        {...props}
        {...stateAttributes}
        className={clsx(className, receivedClassName)}
      />
    );
  }

  return IndicatorPart;
}
