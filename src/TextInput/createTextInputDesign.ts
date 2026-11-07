import {
  createDesign,
  type CreateDesignOptions,
} from '@fringeworks/react-contract';
import {
  textInputDesignDefinition,
  textInputDesignTemplate,
} from './constants';
import type { TextInputDesign } from './types';

/**
 * メインの色・角の丸み・詰め具合などから、TextInputのデザインの値を作る
 *
 * 既定の割り当て（`textInputDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった値の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <TextInput design={createTextInputDesign({ primaryColor: '#0a7d5a' })} … />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns TextInputに渡すデザインの値
 */
export default function createTextInputDesign(
  options: CreateDesignOptions,
): TextInputDesign {
  return createDesign(
    textInputDesignDefinition,
    textInputDesignTemplate,
    options,
  );
}
