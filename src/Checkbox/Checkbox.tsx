import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  Checkbox as CheckboxPrimitive,
  type CheckboxProps,
} from '@fringeworks/react-primitives';

/**
 * 見た目を付けたチェックボックス
 *
 * react-primitives の `Checkbox` に、`frg-checkbox` のクラスと状態の属性（`data-disabled`・`data-invalid`）を付ける。
 * 見た目は `styles.css`（または `checkbox.css`）を読み込むと付く。
 */
export default function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxPrimitive
      {...mergePartProps<CheckboxProps>(
        {
          className: 'frg-checkbox',
          'data-disabled': props.disabled || undefined,
          'data-invalid': props.invalid || undefined,
          partsProps: { input: { className: 'frg-checkbox-input' } },
        },
        props,
      )}
    />
  );
}
