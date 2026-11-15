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
 * 枠と背景は CSS で描く（種類のクラス `frg-checkboxindicator`）。土台のクラス `frg-checkbox-indicator` と状態の `data-*` の属性は、
 * 包む部品（`_createIndicatorPart`）が付ける。印（✓・−）は SVG の `currentColor` で描くので、
 * 印の色を CSS 変数（`indicator.color`）で変えられる。不確定はチェックより優先する。
 */
export default function CheckboxIndicator({
  checked,
  indeterminate,
  // 状態の属性は包む部品が付けるので、要素には渡さない
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  className,
  ...rest
}: CheckboxIndicatorProps): ReactElement {
  return (
    <span {...rest} className={clsx('frg-checkboxindicator', className)}>
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
