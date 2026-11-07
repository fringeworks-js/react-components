import type { CheckboxIndicatorSlotProps } from '@fringeworks/react-primitives';
import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactElement } from 'react';

type CheckboxIndicatorProps = CheckboxIndicatorSlotProps &
  Omit<
    ComponentPropsWithRef<'span'>,
    keyof CheckboxIndicatorSlotProps | 'children'
  >;

/**
 * チェックボックスの印（Checkbox に組み込む。単独では公開しない）
 *
 * 状態を `data-*` の属性で付け、CSS で枠と背景を描く。印（✓・−）は SVG の `currentColor` で描くので、
 * 印の色を CSS 変数（`indicator.color`）で変えられる。不確定はチェックより優先する。
 */
export default function CheckboxIndicator({
  checked,
  indeterminate,
  disabled,
  readOnly,
  invalid,
  className,
  ...rest
}: CheckboxIndicatorProps): ReactElement {
  return (
    <span
      {...rest}
      className={clsx('frg-checkbox-indicator', className)}
      data-checked={checked || undefined}
      data-indeterminate={indeterminate || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-invalid={invalid || undefined}
    >
      {(checked || indeterminate) && (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={indeterminate ? 'M4 8h8' : 'M4 8.5l2.5 2.5L12 5.5'}
          />
        </svg>
      )}
    </span>
  );
}
