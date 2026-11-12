import { createDesign } from '@fringeworks/react-contract';
import { radioDesignDefinition, radioDesignTemplate } from './constants';
import type { CreateRadioDesignOptions, RadioDesign } from './types';

/**
 * メインの色・角の丸み・詰め具合などから、RadioGroup の中のラジオボタンのデザインの値を作る
 *
 * 既定の割り当て（`radioDesignTemplate`）で、react-contract の `createDesign` を呼ぶ。
 * 渡さなかった値の部分は、部品の既定の見た目のまま。
 *
 * @example
 * <RadioGroup partsProps={{ radio: { design: createRadioDesign({ primaryColor: '#0a7d5a' }) } }} … />
 *
 * @param options デザインの元になる値（`primaryColor` など）
 * @returns RadioGroup の中のラジオボタンに渡すデザインの値
 */
export default function createRadioDesign(
  options: CreateRadioDesignOptions,
): RadioDesign {
  return createDesign(radioDesignDefinition, radioDesignTemplate, options);
}
