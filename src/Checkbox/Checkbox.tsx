import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { withCheckbox } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import CheckboxIndicator from './_CheckboxIndicator';
import { checkboxDesignDefinition } from './constants';
import type { CheckboxProps } from './types';

const CheckboxBase = withCheckbox({ Indicator: CheckboxIndicator });

/**
 * 見た目を付けたチェックボックス
 *
 * react-primitives の `withCheckbox` に、見た目を付けた印（`Indicator`）を組み込み、`frg-checkbox` のクラスと
 * 状態の属性（`data-disabled`・`data-invalid`）を付ける。`<input>` は視覚的に隠し、印で状態を見せる。
 * `design` の値は、ルートの `<label>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `checkbox.css`）を読み込むと付く。
 */
export default function Checkbox({
  design,
  ...props
}: CheckboxProps): ReactElement {
  return (
    <CheckboxBase
      {...mergePartProps<Omit<CheckboxProps, 'design'>>(
        {
          className: 'frg-checkbox',
          style: createDesignStyle(
            'frg-checkbox',
            checkboxDesignDefinition,
            design,
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
        props,
      )}
    />
  );
}

// withDesign（react-contract）が、design を重ねるときに読む
Checkbox.designDefinition = checkboxDesignDefinition;
