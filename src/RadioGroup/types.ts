import type { Design } from '@fringeworks/react-contract';
import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioProps as RadioPrimitiveProps,
} from '@fringeworks/react-primitives';
import type { GroupLayoutProps } from '../_internal/_groupLayout';
import type Radio from './_Radio';
import type RadioIndicator from './_RadioIndicator';
import type { radioDesignDefinition } from './constants';

/**
 * RadioGroup の中のラジオボタンに渡すデザインの値（`partsProps.radio.design`）
 */
export type RadioDesign = Design<typeof radioDesignDefinition>;

/**
 * RadioGroup の中のラジオボタンのプロパティ（`partsProps.radio` で渡す）
 */
export type RadioProps = RadioPrimitiveProps<{
  Indicator: typeof RadioIndicator;
}> & {
  /**
   * デザインの値。ルートの `<label>` の `style` に、CSS 変数として設定する
   */
  design?: RadioDesign;
};

export type RadioGroupProps<V> = RadioGroupPrimitiveProps<
  V,
  { Radio: typeof Radio }
> &
  GroupLayoutProps;
