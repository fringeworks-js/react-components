import type { CreateDesignOptions, Design } from '@fringeworks/react-contract';
import type {
  CollapsibleIndicatorSlotProps,
  CollapsibleProps as CollapsiblePrimitiveProps,
} from '@fringeworks/react-primitives';
import type { ComponentType, ReactElement } from 'react';
import type CollapsibleIndicator from './_CollapsibleIndicator';
import type { collapsibleDesignDefinition } from './constants';

/**
 * Collapsible に渡すデザインの値
 */
export type CollapsibleDesign = Design<typeof collapsibleDesignDefinition>;

// withCollapsibleIndicator に渡す印が受け取る props。react-primitives の型なので、同じ名前で export する
export type { CollapsibleIndicatorSlotProps } from '@fringeworks/react-primitives';

/**
 * Collapsible の開閉の印に組み込める部品（`withCollapsibleIndicator` に渡す）
 *
 * 状態（`CollapsibleIndicatorSlotProps`）を受け取って印を描く部品。受け取った `className`・`data-*` を要素に渡す。
 */
export type CollapsibleIndicatorComponent =
  ComponentType<CollapsibleIndicatorSlotProps>;

/**
 * Collapsible のプロパティ
 *
 * @template I 組み込んだ開閉の印（`withCollapsibleIndicator` で作ったものは、渡した印）
 */
export type CollapsibleProps<
  I extends CollapsibleIndicatorComponent = typeof CollapsibleIndicator,
> = CollapsiblePrimitiveProps<{
  Indicator: I;
}> & {
  /**
   * デザインの値。ルートの `<details>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
   */
  design?: CollapsibleDesign;
  /**
   * アプリで共通のデザインの値（`withDesign` が渡す）。`design` で指定していないプロパティ・状態を補う
   */
  fallbackDesign?: CollapsibleDesign;
};

/**
 * 見た目を付けた折りたためる部品（`Collapsible`、`withCollapsibleIndicator` で作ったもの）
 *
 * @template I 組み込んだ開閉の印
 */
export type CollapsibleComponent<
  I extends CollapsibleIndicatorComponent = typeof CollapsibleIndicator,
> = {
  (props: CollapsibleProps<I>): ReactElement;

  /**
   * デザインの定義（react-contract の `withDesign` が読む）
   */
  designDefinition: typeof collapsibleDesignDefinition;

  displayName?: string;
};

/**
 * createCollapsibleDesign のオプション（react-contract の `CreateDesignOptions` と同じ）
 */
export type CreateCollapsibleDesignOptions = CreateDesignOptions;
