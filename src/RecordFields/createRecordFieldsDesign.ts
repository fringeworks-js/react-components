import {
  createDesign,
  type CreateDesignOptions,
} from '@fringeworks/react-contract';
import {
  recordFieldsDesignDefinition,
  recordFieldsDesignTemplate,
} from './constants';
import type { RecordFieldsDesign } from './types';

/**
 * メインの色・角の丸み・詰め具合などから、RecordFieldsのデザインの値を作る
 *
 * 既定の割り当て（`recordFieldsDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった値の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <RecordFields design={createRecordFieldsDesign({ primaryColor: '#0a7d5a' })} … />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns RecordFieldsに渡すデザインの値
 */
export default function createRecordFieldsDesign(
  options: CreateDesignOptions,
): RecordFieldsDesign {
  return createDesign(
    recordFieldsDesignDefinition,
    recordFieldsDesignTemplate,
    options,
  );
}
