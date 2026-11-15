import { mergePartProps } from '@fringeworks/react-parts-props';
import { withCheckboxGroup } from '@fringeworks/react-primitives';
import clsx from 'clsx';
import type { ComponentType, ReactElement } from 'react';
import createGroupLayout from '../_internal/_groupLayout';
import type {
  CheckboxComponent,
  CheckboxIndicatorComponent,
} from '../Checkbox';
import type { CheckboxGroupComponent, CheckboxGroupProps } from './types';

/**
 * react-primitives の `withCheckboxGroup` に見た目を付けたチェックボックスを組み込み、チェックボックスグループを作る
 *
 * `CheckboxGroup` と `withCheckboxGroupIndicator` で共通に使う。すべて選ぶのチェックボックスも、渡したチェックボックスで描く
 * （選択肢と見分けられるよう、`frg-checkboxgroup-selectall` のクラスを足す）。
 * 入れ物に `frg-checkboxgroup` のクラスと、並べ方（style-layouts の `stack`・`flow`）を付ける。
 *
 * @param Checkbox 組み込む、見た目を付けたチェックボックス
 * @param displayName 作ったグループの `displayName`
 * @returns 見た目を付けたチェックボックスグループ
 */
export default function createCheckboxGroup<
  I extends CheckboxIndicatorComponent,
>(
  Checkbox: CheckboxComponent<I>,
  displayName: string,
): CheckboxGroupComponent<I> {
  // 組み込んだ印ごとの props の型は CheckboxGroupProps で決めるので、中では型を広げて描く
  const LooseCheckbox = Checkbox as unknown as ComponentType<
    Record<string, unknown>
  >;

  function SelectAll(props: Record<string, unknown>) {
    return (
      <LooseCheckbox
        {...mergePartProps<Record<string, unknown>>(
          { className: 'frg-checkboxgroup-selectall' },
          props,
        )}
      />
    );
  }

  const CheckboxGroupBase = withCheckboxGroup({
    Checkbox: LooseCheckbox,
    SelectAll,
  }) as unknown as ComponentType<Record<string, unknown>>;

  function CheckboxGroup<V>({
    direction,
    gap,
    ...rest
  }: CheckboxGroupProps<V, I>): ReactElement {
    const layout = createGroupLayout({ direction, gap });

    // 利用者が指定した className・style は、レイアウトのものに重ねる（同じプロパティは利用者の値を優先する）
    return (
      <CheckboxGroupBase
        {...mergePartProps<Record<string, unknown>>(
          {
            className: clsx('frg-checkboxgroup', layout.className),
            style: layout.style,
          },
          rest as Record<string, unknown>,
        )}
      />
    );
  }

  CheckboxGroup.displayName = displayName;

  return CheckboxGroup;
}
