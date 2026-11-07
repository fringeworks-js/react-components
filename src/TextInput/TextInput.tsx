import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { TextInput as TextInputPrimitive } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import { textInputDesignDefinition } from './constants';
import type { TextInputProps } from './types';

/**
 * 見た目を付けたテキストの入力
 *
 * react-primitives の `TextInput` に、`frg-textinput` のクラスを付ける。
 * `design` の値は、`<input>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `textinput.css`）を読み込むと付く。
 */
export default function TextInput({
  design,
  ...props
}: TextInputProps): ReactElement {
  return (
    <TextInputPrimitive
      {...mergePartProps<Omit<TextInputProps, 'design'>>(
        {
          className: 'frg-textinput',
          style: createDesignStyle(
            'frg-textinput',
            textInputDesignDefinition,
            design,
          ),
        },
        props,
      )}
    />
  );
}

// withDesign（react-contract）が、design を重ねるときに読む
TextInput.designDefinition = textInputDesignDefinition;
