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
 * Checkbox のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは `<label>`（チェックボックスの印と文字を並べる）、`indicator` はチェックボックスの印。
 */
export const checkboxDesignDefinition = {
  properties: {
    gap: [],
    color: [],
    opacity: ['disabled'],
  },
  parts: {
    indicator: {
      size: [],
      borderRadius: [],
      borderColor: ['checked', 'indeterminate', 'invalid'],
      backgroundColor: ['checked', 'indeterminate'],
      color: ['checked', 'indeterminate'],
      outlineColor: ['focus'],
    },
  },
} as const satisfies DesignDefinition;

/**
 * Checkbox の既定のデザインの割り当て（`createCheckboxDesign` が使う）
 *
 * - チェック・不確定の印の背景はメインの色。枠とフォーカスの線は、薄い色でも見分けられるように暗くすることがある
 * - チェックしていないときの枠は `neutralColor`、エラーの枠は `errorColor`（渡さなければ既定の見た目のまま）
 * - 印の角の丸みは `radius` の半分。ラジオボタンと紛らわしくならないよう、`0.3em` より丸くしない
 * - 印と文字の間隔・印の大きさは、部品の既定の値（styles.scss の `var()` の既定値と同じ値）に `scaling` を掛ける
 */
export const checkboxDesignTemplate = {
  gap: scaled('6px'),
  indicator: {
    size: scaled('1em'),
    borderRadius: { from: 'radius', scale: 0.5, max: '0.3em' },
    backgroundColor: { checked: 'primaryColor', indeterminate: 'primaryColor' },
    borderColor: {
      base: 'neutralColor',
      checked: primaryOnWhite,
      indeterminate: primaryOnWhite,
      invalid: 'errorColor',
    },
    color: { checked: primaryContrast, indeterminate: primaryContrast },
    outlineColor: { focus: primaryOnWhite },
  },
} as const satisfies DesignTemplate<typeof checkboxDesignDefinition>;
