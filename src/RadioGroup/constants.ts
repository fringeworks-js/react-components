import type {
  DesignDefinition,
  DesignTemplate,
} from '@fringeworks/react-contract';
import {
  primaryContrast,
  primaryOnWhite,
  scaled,
} from '../_internal/_designTemplateParts';

/**
 * RadioGroup の中のラジオボタンのデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは `<label>`（ラジオボタンの印と文字を並べる）、`indicator` はラジオボタンの印（`color` は中の点の色）。
 * RadioGroup では `partsProps.radio.design` で渡す。
 */
export const radioDesignDefinition = {
  properties: {
    gap: [],
    color: [],
    opacity: ['disabled'],
  },
  parts: {
    indicator: {
      size: [],
      borderColor: ['checked', 'invalid'],
      backgroundColor: ['checked'],
      color: ['checked'],
      outlineColor: ['focus'],
    },
  },
} as const satisfies DesignDefinition;

/**
 * RadioGroup の中のラジオボタンの既定のデザインの割り当て（`createRadioDesign` が使う）
 *
 * - 選んだ印の背景はメインの色、中の点は `primaryContrastColor`（無ければ白か黒）。枠とフォーカスの線は、白の上で見分けられるように暗くすることがある
 * - 選んでいないときの枠は `neutralColor`、エラーの枠は `errorColor`
 * - 印は円なので `radius` は使わない。印と文字の間隔・印の大きさは、部品の既定の値に `scaling` を掛ける
 */
export const radioDesignTemplate = {
  gap: scaled('6px'),
  indicator: {
    size: scaled('1em'),
    backgroundColor: { checked: 'primaryColor' },
    borderColor: {
      base: 'neutralColor',
      checked: primaryOnWhite,
      invalid: 'errorColor',
    },
    color: { checked: primaryContrast },
    outlineColor: { focus: primaryOnWhite },
  },
} as const satisfies DesignTemplate<typeof radioDesignDefinition>;
