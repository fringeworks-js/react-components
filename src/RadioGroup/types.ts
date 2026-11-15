import type { CreateDesignOptions, Design } from '@fringeworks/react-contract';
import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioIndicatorSlotProps,
  RadioProps as RadioPrimitiveProps,
} from '@fringeworks/react-primitives';
import type { ComponentType, ReactElement } from 'react';
import type { GroupLayoutProps } from '../_internal/_groupLayout';
import type RadioIndicator from './_RadioIndicator';
import type { radioDesignDefinition } from './constants';

/**
 * RadioGroup の中のラジオボタンに渡すデザインの値（`partsProps.radio.design`）
 */
export type RadioDesign = Design<typeof radioDesignDefinition>;

// withRadioGroupIndicator に渡す印が受け取る props。react-primitives の型なので、同じ名前で export する
export type { RadioIndicatorSlotProps } from '@fringeworks/react-primitives';

/**
 * ラジオボタンの印に組み込める部品（`withRadioGroupIndicator` に渡す）
 *
 * 状態（`RadioIndicatorSlotProps`）を受け取って印を描く部品。受け取った `className`・`data-*` を要素に渡す。
 */
export type RadioIndicatorComponent = ComponentType<RadioIndicatorSlotProps>;

/**
 * RadioGroup の中のラジオボタンのプロパティ（`partsProps.radio` で渡す）
 *
 * @template I 組み込んだ印
 */
export type RadioProps<
  I extends RadioIndicatorComponent = typeof RadioIndicator,
> = RadioPrimitiveProps<{
  Indicator: I;
}> & {
  /**
   * デザインの値。ルートの `<label>` の `style` に、CSS 変数として設定する
   */
  design?: RadioDesign;
  /**
   * アプリで共通のデザインの値（`withDesign` が渡す）。`design` で指定していないプロパティ・状態を補う
   */
  fallbackDesign?: RadioDesign;
};

/**
 * RadioGroup の中のラジオボタン（単独では公開しない）
 *
 * @template I 組み込んだ印
 */
export type RadioComponent<
  I extends RadioIndicatorComponent = typeof RadioIndicator,
> = (props: RadioProps<I>) => ReactElement;

/**
 * RadioGroup のプロパティ
 *
 * @template V 値の型
 * @template I ラジオボタンに組み込んだ印（`withRadioGroupIndicator` で作ったものは、渡した印）
 */
export type RadioGroupProps<
  V,
  I extends RadioIndicatorComponent = typeof RadioIndicator,
> = RadioGroupPrimitiveProps<V, { Radio: RadioComponent<I> }> &
  GroupLayoutProps;

/**
 * 見た目を付けたラジオグループ（`RadioGroup`、`withRadioGroupIndicator` で作ったもの）
 *
 * @template I ラジオボタンに組み込んだ印
 */
export type RadioGroupComponent<
  I extends RadioIndicatorComponent = typeof RadioIndicator,
> = {
  <V>(props: RadioGroupProps<V, I>): ReactElement;

  displayName?: string;
};

/**
 * createRadioDesign のオプション（react-contract の `CreateDesignOptions` と同じ）
 */
export type CreateRadioDesignOptions = CreateDesignOptions;
