import type { CollapsibleIndicatorSlotProps } from '@fringeworks/react-primitives';
import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactElement } from 'react';

type CollapsibleIndicatorProps = CollapsibleIndicatorSlotProps &
  Omit<
    ComponentPropsWithRef<'span'>,
    keyof CollapsibleIndicatorSlotProps | 'children'
  >;

/**
 * 開閉の印（›。Collapsible に組み込む。単独では公開しない）
 *
 * CSS で印を描いて（種類のクラス `frg-collapsibleindicator`）、開くと下に向ける。印の色は `currentColor`（`indicator.color`）。
 * 土台のクラス `frg-collapsible-indicator` と状態の `data-*` の属性は、包む部品（`_createIndicatorPart`）が付ける。
 */
export default function CollapsibleIndicator({
  // 状態の属性は包む部品が付けるので、要素には渡さない
  open: _open,
  disabled: _disabled,
  className,
  ...rest
}: CollapsibleIndicatorProps): ReactElement {
  return (
    <span {...rest} className={clsx('frg-collapsibleindicator', className)} />
  );
}
