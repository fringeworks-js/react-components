import {
  createDesign,
  type CreateDesignOptions,
} from '@fringeworks/react-contract';
import { buttonDesignDefinition, buttonDesignTemplate } from './constants';
import type { ButtonDesign } from './types';

/**
 * メインの色・角の丸み・詰め具合などから、Buttonのデザインの値を作る
 *
 * 既定の割り当て（`buttonDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった値の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <Button design={createButtonDesign({ primaryColor: '#0a7d5a' })} … />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns Buttonに渡すデザインの値
 */
export default function createButtonDesign(
  options: CreateDesignOptions,
): ButtonDesign {
  return createDesign(buttonDesignDefinition, buttonDesignTemplate, options);
}
