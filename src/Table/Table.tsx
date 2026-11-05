import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  Table as TablePrimitive,
  type TableProps,
  type TableRowId,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';

/**
 * 見た目を付けた表
 *
 * react-primitives の `Table` に、`frg-table` のクラスを付ける。
 * 見た目は `styles.css`（または `table.css`）を読み込むと付く。
 */
export default function Table<R extends { id: TableRowId }>(
  props: TableProps<R>,
): ReactElement {
  return (
    <TablePrimitive
      {...mergePartProps<TableProps<R>>({ className: 'frg-table' }, props)}
    />
  );
}
