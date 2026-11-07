import type {
  DesignDefinition,
  DesignTemplate,
} from '@fringeworks/react-contract';
import { lightNeutral, scaled } from '../_internal/_designTemplateParts';

/**
 * Table のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * ルートは `<table>`、`headerCell` は列の見出しのセル（`<th>`）、`cell` はデータのセル（`<td>`）。
 */
export const tableDesignDefinition = {
  properties: {
    color: [],
  },
  parts: {
    headerCell: {
      backgroundColor: [],
      borderColor: [],
      fontWeight: [],
      paddingX: [],
      paddingY: [],
    },
    cell: {
      borderColor: [],
      paddingX: [],
      paddingY: [],
    },
  },
} as const satisfies DesignDefinition;

/**
 * Table の既定のデザインの割り当て（`createTableDesign` が使う）
 *
 * - 見出しの行の線は `neutralColor`、データの行の線は `neutralColor` を白に寄せた色
 * - セルの左右と上下の余白は、部品の既定の値に `scaling` を掛ける
 */
export const tableDesignTemplate = {
  headerCell: {
    borderColor: 'neutralColor',
    paddingX: scaled('0.75em'),
    paddingY: scaled('0.5em'),
  },
  cell: {
    borderColor: lightNeutral(0.35),
    paddingX: scaled('0.75em'),
    paddingY: scaled('0.5em'),
  },
} as const satisfies DesignTemplate<typeof tableDesignDefinition>;
