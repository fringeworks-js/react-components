import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { withCheckbox } from '@fringeworks/react-primitives';
import type { ComponentType, ReactElement } from 'react';
import createIndicatorPart from '../_internal/_createIndicatorPart';
import { checkboxDesignDefinition } from './constants';
import type {
  CheckboxComponent,
  CheckboxIndicatorComponent,
  CheckboxProps,
} from './types';

/**
 * react-primitives の `withCheckbox` に印を組み込み、見た目を付けたチェックボックスを作る
 *
 * `Checkbox` と `withCheckboxIndicator` で共通に使う。印は `_createIndicatorPart` で包み、土台のクラスと状態の属性を付ける。
 * ルートの `<label>` に `frg-checkbox` のクラスと状態の属性（`data-disabled`・`data-invalid`）を付け、
 * `design` の値は `<label>` の `style` に CSS 変数として設定する。
 *
 * @param Indicator 組み込む印
 * @param displayName 作ったチェックボックスの `displayName`
 * @returns 見た目を付けたチェックボックス
 */
export default function createCheckbox<I extends CheckboxIndicatorComponent>(
  Indicator: I,
  displayName: string,
): CheckboxComponent<I> {
  // 組み込んだ印ごとの props の型は CheckboxProps で決めるので、中では型を広げて描く
  const CheckboxBase = withCheckbox({
    Indicator: createIndicatorPart('frg-checkbox-indicator', Indicator),
  }) as unknown as ComponentType<Record<string, unknown>>;

  function Checkbox({
    design,
    fallbackDesign,
    ...props
  }: CheckboxProps<I>): ReactElement {
    return (
      <CheckboxBase
        {...mergePartProps<Record<string, unknown>>(
          {
            className: 'frg-checkbox',
            style: createDesignStyle(
              'frg-checkbox',
              checkboxDesignDefinition,
              design,
              fallbackDesign,
            ),
            partsProps: {
              // 主要素は <input> なので、<label> の属性は partsProps.label で付ける
              label: {
                'data-disabled': props.disabled || undefined,
                'data-invalid': props.invalid || undefined,
              },
              input: { className: 'frg-checkbox-input' },
            },
          },
          props as Record<string, unknown>,
        )}
      />
    );
  }

  // withDesign（react-contract）が、design を重ねるときに読む
  Checkbox.designDefinition = checkboxDesignDefinition;
  Checkbox.displayName = displayName;

  return Checkbox;
}
