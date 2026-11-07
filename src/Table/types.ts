import type { Design } from '@fringeworks/react-contract';
import type {
  TableProps as TablePrimitiveProps,
  TableRowId,
} from '@fringeworks/react-primitives';
import type { tableDesignDefinition } from './constants';

/**
 * Table に渡すデザインの値
 */
export type TableDesign = Design<typeof tableDesignDefinition>;

/**
 * Table のプロパティ
 */
export type TableProps<R extends { id: TableRowId }> =
  TablePrimitiveProps<R> & {
    /**
     * デザインの値。`<table>` の `style` に、CSS 変数として設定する（`style` で同じ変数を指定したら、そちらを優先する）
     */
    design?: TableDesign;
  };
