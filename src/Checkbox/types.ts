import type { CreateDesignOptions, Design } from '@fringeworks/react-contract';
import type {
  CheckboxIndicatorSlotProps,
  CheckboxProps as CheckboxPrimitiveProps,
} from '@fringeworks/react-primitives';
import type { ComponentType, ReactElement } from 'react';
import type CheckboxIndicator from './_CheckboxIndicator';
import type { checkboxDesignDefinition } from './constants';

/**
 * Checkbox に渡すデザインの値
 */
export type CheckboxDesign = Design<typeof checkboxDesignDefinition>;

// withCheckboxIndicator に渡す印が受け取る props。react-primitives の型なので、同じ名前で export する
export type { CheckboxIndicatorSlotProps } from '@fringeworks/react-primitives';

/**
 * Checkbox の印に組み込める部品（`withCheckboxIndicator` に渡す）
 *
 * 状態（`CheckboxIndicatorSlotProps`）を受け取って印を描く部品。受け取った `className`・`data-*` を要素に渡す。
 */
export type CheckboxIndicatorComponent =
  ComponentType<CheckboxIndicatorSlotProps>;

/**
 * Checkbox のプロパティ
 *
 * @template I 組み込んだ印（`withCheckboxIndicator` で作ったものは、渡した印）
 */
export type CheckboxProps<
  I extends CheckboxIndicatorComponent = typeof CheckboxIndicator,
> = CheckboxPrimitiveProps<{
  Indicator: I;
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

/**
 * 見た目を付けたチェックボックス（`Checkbox`、`withCheckboxIndicator` で作ったもの）
 *
 * @template I 組み込んだ印
 */
export type CheckboxComponent<
  I extends CheckboxIndicatorComponent = typeof CheckboxIndicator,
> = {
  (props: CheckboxProps<I>): ReactElement;

  /**
   * デザインの定義（react-contract の `withDesign` が読む）
   */
  designDefinition: typeof checkboxDesignDefinition;

  displayName?: string;
};
