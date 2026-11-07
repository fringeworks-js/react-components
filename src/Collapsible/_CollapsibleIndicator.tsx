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
 * 状態を `data-*` の属性で付け、CSS で印を描いて、開くと下に向ける。印の色は `currentColor`（`indicator.color`）。
 */
export default function CollapsibleIndicator({
  open,
  disabled,
  className,
  ...rest
}: CollapsibleIndicatorProps): ReactElement {
  return (
    <span
      {...rest}
      className={clsx('frg-collapsible-indicator', className)}
      data-open={open || undefined}
      data-disabled={disabled || undefined}
    />
  );
}
