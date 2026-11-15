import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { withRadio } from '@fringeworks/react-primitives';
import type { ComponentType, ReactElement } from 'react';
import createIndicatorPart from '../_internal/_createIndicatorPart';
import { radioDesignDefinition } from './constants';
import type {
  RadioComponent,
  RadioIndicatorComponent,
  RadioProps,
} from './types';

/**
 * react-primitives の `withRadio` に印を組み込み、見た目を付けたラジオボタンを作る（RadioGroup に組み込む。単独では公開しない）
 *
 * 印は `_createIndicatorPart` で包み、土台のクラス（`frg-radio-indicator`）と状態の属性を付ける。
 * ルートの `<label>` に `frg-radio` のクラスと状態の属性（`data-disabled`・`data-invalid`）を付け、
 * `design` の値は `<label>` の `style` に CSS 変数として設定する。`<input>` は視覚的に隠し、印で状態を見せる。
 *
 * @param Indicator 組み込む印
 * @returns 見た目を付けたラジオボタン
 */
export default function createRadio<I extends RadioIndicatorComponent>(
  Indicator: I,
): RadioComponent<I> {
  // 組み込んだ印ごとの props の型は RadioProps で決めるので、中では型を広げて描く
  const RadioBase = withRadio({
    Indicator: createIndicatorPart('frg-radio-indicator', Indicator),
  }) as unknown as ComponentType<Record<string, unknown>>;

  function Radio({
    design,
    fallbackDesign,
    ...props
  }: RadioProps<I>): ReactElement {
    return (
      <RadioBase
        {...mergePartProps<Record<string, unknown>>(
          {
            className: 'frg-radio',
            style: createDesignStyle(
              'frg-radio',
              radioDesignDefinition,
              design,
              fallbackDesign,
            ),
            partsProps: {
              // 主要素は <input> なので、<label> の属性は partsProps.label で付ける
              label: {
                'data-disabled': props.disabled || undefined,
                'data-invalid': props.invalid || undefined,
              },
              input: { className: 'frg-radio-input' },
            },
          },
          props as Record<string, unknown>,
        )}
      />
    );
  }

  return Radio;
}
