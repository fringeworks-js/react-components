import type {
  DesignDefinition,
  DesignTemplate,
} from '@fringeworks/react-contract';
import { primaryOnWhite, scaled } from '../_internal/_designTemplateParts';

/**
 * TextInput のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは `<input>`、`placeholder` はプレースホルダー（`::placeholder`）。
 */
export const textInputDesignDefinition = {
  properties: {
    color: [],
    backgroundColor: [],
    borderColor: ['invalid'],
    borderRadius: [],
    paddingX: [],
    paddingY: [],
    opacity: ['disabled'],
    outlineColor: ['focus'],
  },
  parts: {
    placeholder: {
      color: [],
    },
  },
} as const satisfies DesignDefinition;

/**
 * TextInput の既定のデザインの割り当て（`createTextInputDesign` が使う）
 *
 * - フォーカスの線はメインの色（白の上で見分けられるように暗くすることがある）
 * - 枠とプレースホルダーは `neutralColor`、エラーの枠は `errorColor`
 * - 角の丸みは `radius` のまま。左右と上下の余白は、部品の既定の値に `scaling` を掛ける
 */
export const textInputDesignTemplate = {
  borderColor: { base: 'neutralColor', invalid: 'errorColor' },
  borderRadius: 'radius',
  paddingX: scaled('0.625em'),
  paddingY: scaled('0.375em'),
  outlineColor: { focus: primaryOnWhite },
  placeholder: { color: 'neutralColor' },
} as const satisfies DesignTemplate<typeof textInputDesignDefinition>;
