import {
  createDesign,
  type CreateDesignOptions,
} from '@fringeworks/react-contract';
import {
  collapsibleDesignDefinition,
  collapsibleDesignTemplate,
} from './constants';
import type { CollapsibleDesign } from './types';

/**
 * メインの色・角の丸み・詰め具合などから、Collapsibleのデザインの値を作る
 *
 * 既定の割り当て（`collapsibleDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった値の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <Collapsible design={createCollapsibleDesign({ primaryColor: '#0a7d5a' })} … />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns Collapsibleに渡すデザインの値
 */
export default function createCollapsibleDesign(
  options: CreateDesignOptions,
): CollapsibleDesign {
  return createDesign(
    collapsibleDesignDefinition,
    collapsibleDesignTemplate,
    options,
  );
}
