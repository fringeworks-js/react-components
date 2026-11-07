import type { RadioIndicatorSlotProps } from '@fringeworks/react-primitives';
import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactElement } from 'react';

type RadioIndicatorProps = RadioIndicatorSlotProps &
  Omit<
    ComponentPropsWithRef<'span'>,
    keyof RadioIndicatorSlotProps | 'children'
  >;

/**
 * ラジオボタンの印（RadioGroup の中のラジオボタンに組み込む。単独では公開しない）
 *
 * 状態を `data-*` の属性で付け、CSS で枠と背景を描く。中の点は SVG の円を `currentColor` で描くので、
 * 点の色を CSS 変数（`indicator.color`）で変えられる。
 * 点をグラデーションで描くと、小さい円の輪郭がなじまず（アンチエイリアスされず）ひし形のように見えるため、SVG にしている。
 */
export default function RadioIndicator({
  checked,
  disabled,
  readOnly,
  invalid,
  className,
  ...rest
}: RadioIndicatorProps): ReactElement {
  return (
    <span
      {...rest}
      className={clsx('frg-radio-indicator', className)}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-invalid={invalid || undefined}
    >
      {checked && (
        <svg viewBox="0 0 16 16" fill="currentColor">
          <circle cx={8} cy={8} r={3.5} />
        </svg>
      )}
    </span>
  );
}
