import type { CreateDesignOptions, Design } from '@fringeworks/react-contract';
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
  /**
   * アプリで共通のデザインの値（`withDesign` が渡す）。`design` で指定していないプロパティ・状態を補う
   */
  fallbackDesign?: CheckboxDesign;
};

/**
 * createCheckboxDesign のオプション（react-contract の `CreateDesignOptions` と同じ）
 */
export type CreateCheckboxDesignOptions = CreateDesignOptions;
