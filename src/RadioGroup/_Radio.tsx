import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { withRadio } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import RadioIndicator from './_RadioIndicator';
import { radioDesignDefinition } from './constants';
import type { RadioProps } from './types';

const RadioBase = withRadio({ Indicator: RadioIndicator });

/**
 * 見た目を付けたラジオボタン（RadioGroup に組み込む。単独では公開しない）
 *
 * react-primitives の `withRadio` に、見た目を付けた印（`Indicator`）を組み込み、`frg-radio` のクラスと
 * 状態の属性（`data-disabled`・`data-invalid`）を付ける。`<input>` は視覚的に隠し、印で状態を見せる。
 * `design` の値は、ルートの `<label>` の `style` に CSS 変数として設定する。
 */
export default function Radio({ design, ...props }: RadioProps): ReactElement {
  return (
    <RadioBase
      {...mergePartProps<Omit<RadioProps, 'design'>>(
        {
          className: 'frg-radio',
          style: createDesignStyle('frg-radio', radioDesignDefinition, design),
          partsProps: {
            // 主要素は <input> なので、<label> の属性は partsProps.label で付ける
            label: {
              'data-disabled': props.disabled || undefined,
              'data-invalid': props.invalid || undefined,
            },
            input: { className: 'frg-radio-input' },
          },
        },
        props,
      )}
    />
  );
}
