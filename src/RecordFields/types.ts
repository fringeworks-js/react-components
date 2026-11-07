import type { Design } from '@fringeworks/react-contract';
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
  };
