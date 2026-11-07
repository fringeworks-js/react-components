import type { Design } from '@fringeworks/react-contract';
import type { TextInputProps as TextInputPrimitiveProps } from '@fringeworks/react-primitives';
import type { textInputDesignDefinition } from './constants';

/**
 * TextInput に渡すデザインの値
 */
export type TextInputDesign = Design<typeof textInputDesignDefinition>;

/**
 * TextInput のプロパティ
 */
export type TextInputProps = TextInputPrimitiveProps & {
  /**
   * デザインの値。`<input>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
   */
  design?: TextInputDesign;
};
