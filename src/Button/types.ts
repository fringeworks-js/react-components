import type {
  CreateDesignOptions,
  Design,
  IconComponent,
} from '@fringeworks/react-contract';
import type {
  ButtonParts,
  ButtonProps as ButtonPrimitiveProps,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import type { buttonDesignDefinition } from './constants';

/**
 * Button に渡すデザインの値
 */
export type ButtonDesign = Design<typeof buttonDesignDefinition>;

// withButtonIcon に渡すアイコンの部品の型。react-contract の型なので、同じ名前で export する
export type { IconComponent } from '@fringeworks/react-contract';

// withButtonIcon で作ったボタンの icon・endIcon の型。react-primitives の型なので、同じ名前で export する
export type { ButtonIconValue } from '@fringeworks/react-primitives';

/**
 * Button のプロパティ
 *
 * @template V `value` の型
 * @template P 組み込んだ部品（`withButtonIcon` で作ったボタンは `{ Icon: アイコンの部品 }`）
 */
export type ButtonProps<
  V = undefined,
  P extends ButtonParts = object,
> = ButtonPrimitiveProps<V, P> & {
  /**
   * デザインの値。`<button>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
   */
  design?: ButtonDesign;
  /**
   * アプリで共通のデザインの値（`withDesign` が渡す）。`design` で指定していないプロパティ・状態を補う
   */
  fallbackDesign?: ButtonDesign;
};

/**
 * createButtonDesign のオプション（react-contract の `CreateDesignOptions` と同じ）
 */
export type CreateButtonDesignOptions = CreateDesignOptions;

/**
 * `withButtonIcon` で作った、アイコンを置けるボタン
 *
 * @template I 組み込んだアイコンの部品
 */
export type ButtonWithIconComponent<I extends IconComponent> = {
  <V = undefined>(props: ButtonProps<V, { Icon: I }>): ReactElement;

  /**
   * デザインの定義（react-contract の `withDesign` が読む）
   */
  designDefinition: typeof buttonDesignDefinition;

  displayName?: string;
};
