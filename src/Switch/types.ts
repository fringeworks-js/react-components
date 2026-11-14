import type { CreateDesignOptions, Design } from '@fringeworks/react-contract';
import type { SwitchProps as SwitchPrimitiveProps } from '@fringeworks/react-primitives';
import type SwitchIndicator from './_SwitchIndicator';
import type { switchDesignDefinition } from './constants';

/**
 * Switch に渡すデザインの値
 */
export type SwitchDesign = Design<typeof switchDesignDefinition>;

/**
 * Switch のプロパティ
 */
export type SwitchProps = SwitchPrimitiveProps<{
  Indicator: typeof SwitchIndicator;
}> & {
  /**
   * デザインの値。ルートの `<label>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
   */
  design?: SwitchDesign;
  /**
   * アプリで共通のデザインの値（`withDesign` が渡す）。`design` で指定していないプロパティ・状態を補う
   */
  fallbackDesign?: SwitchDesign;
};

/**
 * createSwitchDesign のオプション（react-contract の `CreateDesignOptions` と同じ）
 */
export type CreateSwitchDesignOptions = CreateDesignOptions;
