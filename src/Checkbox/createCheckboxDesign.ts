import {
  createDesign,
  type CreateDesignOptions,
} from '@fringeworks/react-contract';
import { checkboxDesignDefinition, checkboxDesignTemplate } from './constants';
import type { CheckboxDesign } from './types';

/**
 * メインの色などから、Checkbox のデザインの値を作る
 *
 * 既定の割り当て（`checkboxDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった色の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <Checkbox design={createCheckboxDesign({ primaryColor: '#0a7d5a' })} />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns Checkbox に渡すデザインの値
 */
export default function createCheckboxDesign(
  options: CreateDesignOptions,
): CheckboxDesign {
  return createDesign(
    checkboxDesignDefinition,
    checkboxDesignTemplate,
    options,
  );
}
