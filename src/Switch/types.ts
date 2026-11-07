import type { Design } from '@fringeworks/react-contract';
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
};
