import type {
  DesignDefinition,
  DesignTemplate,
} from '@fringeworks/react-contract';
import { primaryOnWhite, scaled } from '../_internal/_designTemplateParts';

/**
 * Collapsible のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは `<details>`（`gap` は、開いたときの見出しと中身の間隔）、`summary` は見出し、`indicator` は開閉の印（›）。
 */
export const collapsibleDesignDefinition = {
  properties: {
    gap: [],
  },
  parts: {
    summary: {
      gap: [],
      opacity: ['disabled'],
      outlineColor: ['focus'],
    },
    indicator: {
      color: [],
    },
  },
} as const satisfies DesignDefinition;

/**
 * Collapsible の既定のデザインの割り当て（`createCollapsibleDesign` が使う）
 *
 * - 見出しのフォーカスの線はメインの色（白の上で見分けられるように暗くすることがある）
 * - 見出しと中身の間隔・印と見出しの文字の間隔は、部品の既定の値に `scaling` を掛ける
 */
export const collapsibleDesignTemplate = {
  gap: scaled('8px'),
  summary: {
    gap: scaled('6px'),
    outlineColor: { focus: primaryOnWhite },
  },
} as const satisfies DesignTemplate<typeof collapsibleDesignDefinition>;
