import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  Radio as RadioPrimitive,
  type RadioProps,
} from '@fringeworks/react-primitives';

/**
 * 見た目を付けたラジオボタン（RadioGroup に組み込む。単独では公開しない）
 *
 * react-primitives の `Radio` に、`frg-radio` のクラスと状態の属性（`data-disabled`・`data-invalid`）を付ける。
 * ラジオボタンには `aria-invalid` を付けられないので、不正の見た目は `<label>` の `data-invalid` で付ける。
 */
export default function Radio(props: RadioProps) {
  return (
    <RadioPrimitive
      {...mergePartProps<RadioProps>(
        {
          className: 'frg-radio',
          'data-disabled': props.disabled || undefined,
          'data-invalid': props.invalid || undefined,
          partsProps: { input: { className: 'frg-radio-input' } },
        },
        props,
      )}
    />
  );
}
