import type { CreateDesignOptions, Design } from '@fringeworks/react-contract';
import type { RecordFieldsProps as RecordFieldsPrimitiveProps } from '@fringeworks/react-primitives';
import type { recordFieldsDesignDefinition } from './constants';

/**
 * RecordFields に渡すデザインの値
 */
export type RecordFieldsDesign = Design<typeof recordFieldsDesignDefinition>;

/**
 * RecordFields のプロパティ
 */
export type RecordFieldsProps<T extends object> =
  RecordFieldsPrimitiveProps<T> & {
    /**
     * デザインの値。ルートの `<div>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
     */
    design?: RecordFieldsDesign;
    /**
     * アプリで共通のデザインの値（`withDesign` が渡す）。`design` で指定していないプロパティ・状態を補う
     */
    fallbackDesign?: RecordFieldsDesign;
  };

/**
 * createRecordFieldsDesign のオプション（react-contract の `CreateDesignOptions` と同じ）
 */
export type CreateRecordFieldsDesignOptions = CreateDesignOptions;

// 項目の型（`fields`）と、その中の型、値の変化の付帯情報、`partsProps` の関数が受け取る項目の情報。
// 利用者が `@fringeworks/react-primitives` を入れずに使えるよう、ここから export する
export type {
  FieldValueContext,
  FieldValueProps,
  RecordField,
  RecordFieldContext,
  RecordFieldsValueChangeDetails,
} from '@fringeworks/react-primitives';
