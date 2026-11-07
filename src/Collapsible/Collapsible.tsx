import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { withCollapsible } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import CollapsibleIndicator from './_CollapsibleIndicator';
import { collapsibleDesignDefinition } from './constants';
import type { CollapsibleProps } from './types';

const CollapsibleBase = withCollapsible({ Indicator: CollapsibleIndicator });

/**
 * 見た目を付けた、折りたためる部品
 *
 * react-primitives の `withCollapsible` に、見た目を付けた開閉の印（`Indicator`）を組み込み、`frg-collapsible` のクラスと、
 * 見出しの `frg-collapsible-summary` のクラスを付ける。`design` の値は、ルートの `<details>` の `style` に CSS 変数として設定する。
 * 見た目は `styles.css`（または `collapsible.css`）を読み込むと付く。
 */
export default function Collapsible({
  design,
  ...props
}: CollapsibleProps): ReactElement {
  return (
    <CollapsibleBase
      {...mergePartProps<Omit<CollapsibleProps, 'design'>>(
        {
          className: 'frg-collapsible',
          style: createDesignStyle(
            'frg-collapsible',
            collapsibleDesignDefinition,
            design,
          ),
          partsProps: { summary: { className: 'frg-collapsible-summary' } },
        },
        props,
      )}
    />
  );
}

// withDesign（react-contract）が、design を重ねるときに読む
Collapsible.designDefinition = collapsibleDesignDefinition;
