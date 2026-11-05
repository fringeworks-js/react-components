import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  Switch as SwitchPrimitive,
  type SwitchProps,
} from '@fringeworks/react-primitives';

/**
 * 見た目を付けたスイッチ
 *
 * react-primitives の `Switch` に、`frg-switch` のクラスと状態の属性（`data-disabled`・`data-invalid`）を付ける。
 * 見た目は `styles.css`（または `switch.css`）を読み込むと付く。つまみと溝は `<input>` の背景で描くので、要素を足さない。
 */
export default function Switch(props: SwitchProps) {
  return (
    <SwitchPrimitive
      {...mergePartProps<SwitchProps>(
        {
          className: 'frg-switch',
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
