import type { Design } from '@fringeworks/react-contract';
import type { CheckboxProps as CheckboxPrimitiveProps } from '@fringeworks/react-primitives';
import type CheckboxIndicator from './_CheckboxIndicator';
import type { checkboxDesignDefinition } from './constants';

/**
 * Checkbox に渡すデザインの値
 */
export type CheckboxDesign = Design<typeof checkboxDesignDefinition>;

/**
 * Checkbox のプロパティ
 */
export type CheckboxProps = CheckboxPrimitiveProps<{
  Indicator: typeof CheckboxIndicator;
}> & {
  /**
   * デザインの値。ルートの `<label>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
   */
  design?: CheckboxDesign;
};
