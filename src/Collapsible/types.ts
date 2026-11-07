import type { Design } from '@fringeworks/react-contract';
import type { CollapsibleProps as CollapsiblePrimitiveProps } from '@fringeworks/react-primitives';
import type CollapsibleIndicator from './_CollapsibleIndicator';
import type { collapsibleDesignDefinition } from './constants';

/**
 * Collapsible に渡すデザインの値
 */
export type CollapsibleDesign = Design<typeof collapsibleDesignDefinition>;

/**
 * Collapsible のプロパティ
 */
export type CollapsibleProps = CollapsiblePrimitiveProps<{
  Indicator: typeof CollapsibleIndicator;
}> & {
  /**
   * デザインの値。ルートの `<details>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
   */
  design?: CollapsibleDesign;
};
