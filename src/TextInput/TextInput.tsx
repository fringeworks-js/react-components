import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  TextInput as TextInputPrimitive,
  type TextInputProps,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';

/**
 * 見た目を付けたテキストの入力
 *
 * react-primitives の `TextInput` に、`frg-textinput` のクラスを付ける。
 * 見た目は `styles.css`（または `textinput.css`）を読み込むと付く。
 */
export default function TextInput(props: TextInputProps): ReactElement {
  return (
    <TextInputPrimitive
      {...mergePartProps<TextInputProps>({ className: 'frg-textinput' }, props)}
    />
  );
}
