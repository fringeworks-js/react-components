import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  withCheckboxGroup,
  type CheckboxProps,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import createGroupLayout, {
  type GroupLayoutProps,
} from '../_internal/_groupLayout';
import Checkbox from '../Checkbox';
import type { CheckboxGroupProps } from './types';

/**
 * すべて選ぶのチェックボックス（選択肢と見分けられるよう、クラスを足す）
 */
function SelectAll(props: CheckboxProps) {
  return (
    <Checkbox
      {...mergePartProps<CheckboxProps>(
        { className: 'frg-checkboxgroup-selectall' },
        props,
      )}
    />
  );
}

const CheckboxGroupBase = withCheckboxGroup({ Checkbox, SelectAll });

/**
 * 見た目を付けたチェックボックスグループ
 *
 * react-primitives の `withCheckboxGroup` に、見た目を付けた `Checkbox` を組み込み、
 * 入れ物に `frg-checkboxgroup` のクラスと、並べ方（style-layouts の `stack`・`flow`）を付ける。
 * 見た目は `styles.css`（または `checkboxgroup.css`）を読み込むと付く。
 */
export default function CheckboxGroup<V>({
  direction,
  gap,
  ...rest
}: CheckboxGroupProps<V>): ReactElement {
  const layout = createGroupLayout({ direction, gap });

  // 利用者が指定した className・style は、レイアウトのものに重ねる（同じプロパティは利用者の値を優先する）
  return (
    <CheckboxGroupBase
      {...mergePartProps<Omit<CheckboxGroupProps<V>, keyof GroupLayoutProps>>(
        {
          className: `frg-checkboxgroup ${layout.className}`,
          style: layout.style,
        },
        rest,
      )}
    />
  );
}
