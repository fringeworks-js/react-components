import { mergePartProps } from '@fringeworks/react-parts-props';
import { withRadioGroup } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import createGroupLayout, {
  type GroupLayoutProps,
} from '../_internal/_groupLayout';
import Radio from './_Radio';
import type { RadioGroupProps } from './types';

const RadioGroupBase = withRadioGroup({ Radio });

/**
 * 見た目を付けたラジオグループ
 *
 * react-primitives の `withRadioGroup` に、見た目を付けたラジオボタンを組み込み、
 * 入れ物に `frg-radiogroup` のクラスと、並べ方（style-layouts の `stack`・`flow`）を付ける。
 * 見た目は `styles.css`（または `radiogroup.css`）を読み込むと付く。
 */
export default function RadioGroup<V>({
  direction,
  gap,
  ...rest
}: RadioGroupProps<V>): ReactElement {
  const layout = createGroupLayout({ direction, gap });

  // 利用者が指定した className・style は、レイアウトのものに重ねる（同じプロパティは利用者の値を優先する）
  return (
    <RadioGroupBase
      {...mergePartProps<Omit<RadioGroupProps<V>, keyof GroupLayoutProps>>(
        {
          className: `frg-radiogroup ${layout.className}`,
          style: layout.style,
        },
        rest,
      )}
    />
  );
}
