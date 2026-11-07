import type {
  DesignDefinition,
  DesignTemplate,
} from '@fringeworks/react-contract';
import {
  lightNeutral,
  primaryOnWhite,
  scaled,
} from '../_internal/_designTemplateParts';

/**
 * Button のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは `<button>`。
 */
export const buttonDesignDefinition = {
  properties: {
    gap: [],
    color: [],
    backgroundColor: ['hover', 'active'],
    borderColor: [],
    borderRadius: [],
    paddingX: [],
    paddingY: [],
    opacity: ['disabled'],
    outlineColor: ['focus'],
  },
} as const satisfies DesignDefinition;

/**
 * Button の既定のデザインの割り当て（`createButtonDesign` が使う）
 *
 * - Button は、メインの色で塗らない控えめなボタン。メインの色はフォーカスの線にだけ使う（白の上で見分けられるように暗くすることがある）
 * - 枠は `neutralColor`、hover・active の背景は `neutralColor` を白に寄せた色
 * - 角の丸みは `radius` のまま。間隔・左右と上下の余白は、部品の既定の値に `scaling` を掛ける
 */
export const buttonDesignTemplate = {
  gap: scaled('6px'),
  backgroundColor: { hover: lightNeutral(0.1), active: lightNeutral(0.2) },
  borderColor: 'neutralColor',
  borderRadius: 'radius',
  paddingX: scaled('0.875em'),
  paddingY: scaled('0.375em'),
  outlineColor: { focus: primaryOnWhite },
} as const satisfies DesignTemplate<typeof buttonDesignDefinition>;
