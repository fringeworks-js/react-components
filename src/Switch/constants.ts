import type {
  DesignDefinition,
  DesignTemplate,
} from '@fringeworks/react-contract';
import {
  lightNeutral,
  primaryContrast,
  primaryOnWhite,
  scaled,
} from '../_internal/_designTemplateParts';

/**
 * Switch のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは `<label>`（スイッチと文字を並べる）、`indicator` はスイッチの溝、`thumb` はつまみ。
 */
export const switchDesignDefinition = {
  properties: {
    gap: [],
    color: [],
    opacity: ['disabled'],
  },
  parts: {
    indicator: {
      width: [],
      height: [],
      backgroundColor: ['checked'],
      borderColor: ['invalid'],
      outlineColor: ['focus'],
    },
    thumb: {
      backgroundColor: ['checked'],
    },
  },
} as const satisfies DesignDefinition;

/**
 * Switch の既定のデザインの割り当て（`createSwitchDesign` が使う）
 *
 * - オンの溝はメインの色、オンのつまみは `primaryContrastColor`（無ければ白か黒。Material Design のスイッチと同じく、メインの色の上に置くものとして扱う）
 * - オフの溝は `neutralColor` を白に寄せた色、エラーの枠は `errorColor`。フォーカスの線はメインの色（白の上で見分けられるように暗くすることがある）
 * - 溝は丸いので `radius` は使わない。間隔・溝の幅と高さは、部品の既定の値に `scaling` を掛ける
 */
export const switchDesignTemplate = {
  gap: scaled('6px'),
  indicator: {
    width: scaled('2em'),
    height: scaled('1.125em'),
    backgroundColor: { base: lightNeutral(0.55), checked: 'primaryColor' },
    borderColor: { invalid: 'errorColor' },
    outlineColor: { focus: primaryOnWhite },
  },
  thumb: {
    backgroundColor: { checked: primaryContrast },
  },
} as const satisfies DesignTemplate<typeof switchDesignDefinition>;
