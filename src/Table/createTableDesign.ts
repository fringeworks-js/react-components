import {
  createDesign,
  type CreateDesignOptions,
} from '@fringeworks/react-contract';
import { tableDesignDefinition, tableDesignTemplate } from './constants';
import type { TableDesign } from './types';

/**
 * メインの色・角の丸み・詰め具合などから、Tableのデザインの値を作る
 *
 * 既定の割り当て（`tableDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった値の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <Table design={createTableDesign({ primaryColor: '#0a7d5a' })} … />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns Tableに渡すデザインの値
 */
export default function createTableDesign(
  options: CreateDesignOptions,
): TableDesign {
  return createDesign(tableDesignDefinition, tableDesignTemplate, options);
}
