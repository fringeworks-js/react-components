import type {
  DesignDefinition,
  DesignTemplate,
} from '@fringeworks/react-contract';
import { scaled } from '../_internal/_designTemplateParts';

/**
 * RecordFields のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは項目を並べる `<div>`（`gap` は項目どうしの間隔）、`field` は項目（`gap` はラベルと値の間隔）、`label` は項目のラベル。
 */
export const recordFieldsDesignDefinition = {
  properties: {
    gap: [],
  },
  parts: {
    field: {
      gap: [],
    },
    label: {
      color: [],
      fontWeight: [],
    },
  },
} as const satisfies DesignDefinition;

/**
 * RecordFields の既定のデザインの割り当て（`createRecordFieldsDesign` が使う）
 *
 * - 項目の間隔・項目の中の見出しと値の間隔は、部品の既定の値に `scaling` を掛ける
 */
export const recordFieldsDesignTemplate = {
  gap: scaled('12px'),
  field: {
    gap: scaled('4px'),
  },
} as const satisfies DesignTemplate<typeof recordFieldsDesignDefinition>;
