import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { withSwitch } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import SwitchIndicator from './_SwitchIndicator';
import { switchDesignDefinition } from './constants';
import type { SwitchProps } from './types';

const SwitchBase = withSwitch({ Indicator: SwitchIndicator });

/**
 * 見た目を付けたスイッチ
 *
 * react-primitives の `withSwitch` に、見た目を付けた溝とつまみ（`Indicator`）を組み込み、`frg-switch` のクラスと
 * 状態の属性（`data-disabled`・`data-invalid`）を付ける。`<input>` は視覚的に隠し、溝とつまみで状態を見せる。
 * `design` の値は、ルートの `<label>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `switch.css`）を読み込むと付く。
 */
export default function Switch({
  design,
  ...props
}: SwitchProps): ReactElement {
  return (
    <SwitchBase
      {...mergePartProps<Omit<SwitchProps, 'design'>>(
        {
          className: 'frg-switch',
          style: createDesignStyle(
            'frg-switch',
            switchDesignDefinition,
            design,
          ),
          partsProps: {
            // 主要素は <input> なので、<label> の属性は partsProps.label で付ける
            label: {
              'data-disabled': props.disabled || undefined,
              'data-invalid': props.invalid || undefined,
            },
            input: { className: 'frg-switch-input' },
          },
        },
        props,
      )}
    />
  );
}

// withDesign（react-contract）が、design を重ねるときに読む
Switch.designDefinition = switchDesignDefinition;
