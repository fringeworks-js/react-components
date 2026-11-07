import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  Table as TablePrimitive,
  type TableRowId,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import { tableDesignDefinition } from './constants';
import type { TableProps } from './types';

/**
 * 見た目を付けた表
 *
 * react-primitives の `Table` に、`frg-table` のクラスを付ける。
 * `design` の値は、`<table>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `table.css`）を読み込むと付く。
 */
export default function Table<R extends { id: TableRowId }>({
  design,
  ...props
}: TableProps<R>): ReactElement {
  return (
    <TablePrimitive
      {...mergePartProps<Omit<TableProps<R>, 'design'>>(
        {
          className: 'frg-table',
          style: createDesignStyle('frg-table', tableDesignDefinition, design),
        },
        props,
      )}
    />
  );
}

// withDesign（react-contract）が、design を重ねるときに読む
Table.designDefinition = tableDesignDefinition;
