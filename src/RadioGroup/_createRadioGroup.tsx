import { mergePartProps } from '@fringeworks/react-parts-props';
import { withRadioGroup } from '@fringeworks/react-primitives';
import clsx from 'clsx';
import type { ComponentType, ReactElement } from 'react';
import createGroupLayout from '../_internal/_groupLayout';
import type {
  RadioComponent,
  RadioGroupComponent,
  RadioGroupProps,
  RadioIndicatorComponent,
} from './types';

/**
 * react-primitives の `withRadioGroup` に見た目を付けたラジオボタンを組み込み、ラジオグループを作る
 *
 * `RadioGroup` と `withRadioGroupIndicator` で共通に使う。
 * 入れ物に `frg-radiogroup` のクラスと、並べ方（style-layouts の `stack`・`flow`）を付ける。
 *
 * @param Radio 組み込む、見た目を付けたラジオボタン
 * @param displayName 作ったグループの `displayName`
 * @returns 見た目を付けたラジオグループ
 */
export default function createRadioGroup<I extends RadioIndicatorComponent>(
  Radio: RadioComponent<I>,
  displayName: string,
): RadioGroupComponent<I> {
  // 組み込んだ印ごとの props の型は RadioGroupProps で決めるので、中では型を広げて描く
  const RadioGroupBase = withRadioGroup({
    Radio: Radio as unknown as ComponentType<Record<string, unknown>>,
  }) as unknown as ComponentType<Record<string, unknown>>;

  function RadioGroup<V>({
    direction,
    gap,
    ...rest
  }: RadioGroupProps<V, I>): ReactElement {
    const layout = createGroupLayout({ direction, gap });

    // 利用者が指定した className・style は、レイアウトのものに重ねる（同じプロパティは利用者の値を優先する）
    return (
      <RadioGroupBase
        {...mergePartProps<Record<string, unknown>>(
          {
            className: clsx('frg-radiogroup', layout.className),
            style: layout.style,
          },
          rest as Record<string, unknown>,
        )}
      />
    );
  }

  RadioGroup.displayName = displayName;

  return RadioGroup;
}
