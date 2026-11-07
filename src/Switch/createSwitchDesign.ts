import {
  createDesign,
  type CreateDesignOptions,
} from '@fringeworks/react-contract';
import { switchDesignDefinition, switchDesignTemplate } from './constants';
import type { SwitchDesign } from './types';

/**
 * メインの色・角の丸み・詰め具合などから、Switchのデザインの値を作る
 *
 * 既定の割り当て（`switchDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった値の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <Switch design={createSwitchDesign({ primaryColor: '#0a7d5a' })} … />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns Switchに渡すデザインの値
 */
export default function createSwitchDesign(
  options: CreateDesignOptions,
): SwitchDesign {
  return createDesign(switchDesignDefinition, switchDesignTemplate, options);
}
