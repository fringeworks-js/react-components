import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { RecordFields as RecordFieldsPrimitive } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import { recordFieldsDesignDefinition } from './constants';
import type { RecordFieldsProps } from './types';

/**
 * 見た目を付けた、レコードの項目を並べる部品
 *
 * react-primitives の `RecordFields` に、`frg-recordfields` のクラスを付ける。
 * `design` の値は、ルートの `<div>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `recordfields.css`）を読み込むと付く。
 */
export default function RecordFields<T extends object>({
  design,
  ...props
}: RecordFieldsProps<T>): ReactElement {
  return (
    <RecordFieldsPrimitive
      {...mergePartProps<Omit<RecordFieldsProps<T>, 'design'>>(
        {
          className: 'frg-recordfields',
          style: createDesignStyle(
            'frg-recordfields',
            recordFieldsDesignDefinition,
            design,
          ),
        },
        props,
      )}
    />
  );
}

// withDesign（react-contract）が、design を重ねるときに読む
RecordFields.designDefinition = recordFieldsDesignDefinition;
