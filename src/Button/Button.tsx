import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { Button as ButtonPrimitive } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import { buttonDesignDefinition } from './constants';
import type { ButtonProps } from './types';

/**
 * 見た目を付けたボタン
 *
 * react-primitives の `Button` に、`frg-button` のクラスを付ける。
 * `design` の値は、`<button>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `button.css`）を読み込むと付く。
 */
export default function Button<V = undefined>({
  design,
  ...props
}: ButtonProps<V>): ReactElement {
  return (
    <ButtonPrimitive
      {...mergePartProps<Omit<ButtonProps<V>, 'design'>>(
        {
          className: 'frg-button',
          style: createDesignStyle(
            'frg-button',
            buttonDesignDefinition,
            design,
          ),
        },
        props,
      )}
    />
  );
}

// withDesign（react-contract）が、design を重ねるときに読む
Button.designDefinition = buttonDesignDefinition;
