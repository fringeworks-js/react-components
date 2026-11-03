import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  Button as ButtonPrimitive,
  type ButtonProps,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';

/**
 * 見た目を付けたボタン
 *
 * react-primitives の `Button` に、`frg-button` のクラスを付ける。
 * 見た目は `styles.css`（または `button.css`）を読み込むと付く。
 */
export default function Button<V = undefined>(
  props: ButtonProps<V>,
): ReactElement {
  return (
    <ButtonPrimitive
      {...mergePartProps<ButtonProps<V>>({ className: 'frg-button' }, props)}
    />
  );
}
