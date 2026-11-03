import { mergePartProps } from '@fringeworks/react-parts-props';
import {
  Collapsible as CollapsiblePrimitive,
  type CollapsibleProps,
} from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';

/**
 * 見た目を付けた、折りたためる部品
 *
 * react-primitives の `Collapsible` に、`frg-collapsible` のクラスと、見出しの `frg-collapsible-summary` のクラスを付ける。
 * 見た目は `styles.css`（または `collapsible.css`）を読み込むと付く。
 */
export default function Collapsible(props: CollapsibleProps): ReactElement {
  return (
    <CollapsiblePrimitive
      {...mergePartProps<CollapsibleProps>(
        {
          className: 'frg-collapsible',
          partsProps: { summary: { className: 'frg-collapsible-summary' } },
        },
        props,
      )}
    />
  );
}
