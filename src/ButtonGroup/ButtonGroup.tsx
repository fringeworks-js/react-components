import { mergePartProps } from '@fringeworks/react-parts-props';
import { withButtonGroup } from '@fringeworks/react-primitives';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import createGroupLayout, {
  type GroupLayoutProps,
} from '../_internal/_groupLayout';
import Button from '../Button';
import type { ButtonGroupProps } from './types';

const ButtonGroupBase = withButtonGroup({ Button });

/**
 * ボタンは横に並べることが多いので、既定は横。ボタンは枠で区切られているので、間隔は縦横とも 8
 */
const DEFAULTS = { direction: 'x', gapX: 8, gapY: 8 } as const;

/**
 * 見た目を付けたボタングループ
 *
 * react-primitives の `withButtonGroup` に、見た目を付けた `Button` を組み込み、
 * 入れ物に `frg-buttongroup` のクラスと、並べ方（style-layouts の `stack`・`flow`）を付ける。
 * 見た目は `styles.css`（または `buttongroup.css`）を読み込むと付く。
 */
export default function ButtonGroup<V>({
  direction,
  gap,
  ...rest
}: ButtonGroupProps<V>): ReactElement {
  const layout = createGroupLayout({ direction, gap }, DEFAULTS);

  // 利用者が指定した className・style は、レイアウトのものに重ねる（同じプロパティは利用者の値を優先する）
  return (
    <ButtonGroupBase
      {...mergePartProps<Omit<ButtonGroupProps<V>, keyof GroupLayoutProps>>(
        {
          className: clsx('frg-buttongroup', layout.className),
          style: layout.style,
        },
        rest,
      )}
    />
  );
}
