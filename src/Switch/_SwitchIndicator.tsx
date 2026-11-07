import type { SwitchIndicatorSlotProps } from '@fringeworks/react-primitives';
import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactElement } from 'react';

type SwitchIndicatorProps = SwitchIndicatorSlotProps &
  Omit<
    ComponentPropsWithRef<'span'>,
    keyof SwitchIndicatorSlotProps | 'children'
  >;

/**
 * スイッチの溝とつまみ（Switch に組み込む。単独では公開しない）
 *
 * 溝の要素の中に、つまみの要素（`frg-switch-thumb`）を置く。状態を `data-*` の属性で付け、CSS でつまみを左右に動かす。
 */
export default function SwitchIndicator({
  checked,
  disabled,
  readOnly,
  invalid,
  className,
  ...rest
}: SwitchIndicatorProps): ReactElement {
  return (
    <span
      {...rest}
      className={clsx('frg-switch-indicator', className)}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-invalid={invalid || undefined}
    >
      <span className="frg-switch-thumb" />
    </span>
  );
}
