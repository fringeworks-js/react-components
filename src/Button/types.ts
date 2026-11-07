import type { Design } from '@fringeworks/react-contract';
import type { ButtonProps as ButtonPrimitiveProps } from '@fringeworks/react-primitives';
import type { buttonDesignDefinition } from './constants';

/**
 * Button に渡すデザインの値
 */
export type ButtonDesign = Design<typeof buttonDesignDefinition>;

/**
 * Button のプロパティ
 */
export type ButtonProps<V = undefined> = ButtonPrimitiveProps<V> & {
  /**
   * デザインの値。`<button>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
   */
  design?: ButtonDesign;
};
