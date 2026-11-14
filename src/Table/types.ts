import type { CreateDesignOptions, Design } from '@fringeworks/react-contract';
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
    /**
     * アプリで共通のデザインの値（`withDesign` が渡す）。`design` で指定していないプロパティ・状態を補う
     */
    fallbackDesign?: TableDesign;
  };

/**
 * createTableDesign のオプション（react-contract の `CreateDesignOptions` と同じ）
 */
export type CreateTableDesignOptions = CreateDesignOptions;

// 列の型（`columns`）と、その中の型、行の id、行の描き方（`renderRow`）、値の変化の付帯情報、
// `partsProps` の関数が受け取る行・セルの情報。
// 利用者が `@fringeworks/react-primitives` を入れずに使えるよう、ここから export する
export type {
  TableAlign,
  TableCellContext,
  TableCellElementProps,
  TableColumn,
  TableHeaderCellContext,
  TableHeaderCellProps,
  TableRenderRowProps,
  TableRowContext,
  TableRowId,
  TableValueChangeDetails,
} from '@fringeworks/react-primitives';
