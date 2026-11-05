import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  RecordFields as RecordFieldsPrimitive,
  type RecordFieldsProps,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';

/**
 * 見た目を付けた、レコードの項目を並べる部品
 *
 * react-primitives の `RecordFields` に、`frg-recordfields` のクラスを付ける。
 * 見た目は `styles.css`（または `recordfields.css`）を読み込むと付く。
 */
export default function RecordFields<T extends object>(
  props: RecordFieldsProps<T>,
): ReactElement {
  return (
    <RecordFieldsPrimitive
      {...mergePartProps<RecordFieldsProps<T>>(
        { className: 'frg-recordfields' },
        props,
      )}
    />
  );
}
