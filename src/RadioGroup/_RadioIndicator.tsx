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
 * 枠と背景は CSS で描く（種類のクラス `frg-radioindicator`）。土台のクラス `frg-radio-indicator` と状態の `data-*` の属性は、
 * 包む部品（`_createIndicatorPart`）が付ける。中の点は SVG の円を `currentColor` で描くので、
 * 点の色を CSS 変数（`indicator.color`）で変えられる。
 * 点をグラデーションで描くと、小さい円の輪郭がなじまず（アンチエイリアスされず）ひし形のように見えるため、SVG にしている。
 */
export default function RadioIndicator({
  checked,
  // 状態の属性は包む部品が付けるので、要素には渡さない
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  className,
  ...rest
}: RadioIndicatorProps): ReactElement {
  return (
    <span {...rest} className={clsx('frg-radioindicator', className)}>
      {checked && (
        <svg viewBox="0 0 16 16" fill="currentColor">
          <circle cx={8} cy={8} r={3.5} />
        </svg>
      )}
    </span>
  );
}
