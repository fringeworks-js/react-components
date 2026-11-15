import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { withCollapsible } from '@fringeworks/react-primitives';
import type { ComponentType, ReactElement } from 'react';
import createIndicatorPart from '../_internal/_createIndicatorPart';
import { collapsibleDesignDefinition } from './constants';
import type {
  CollapsibleComponent,
  CollapsibleIndicatorComponent,
  CollapsibleProps,
} from './types';

/**
 * react-primitives の `withCollapsible` に開閉の印を組み込み、見た目を付けた折りたためる部品を作る
 *
 * `Collapsible` と `withCollapsibleIndicator` で共通に使う。印は `_createIndicatorPart` で包み、
 * 土台のクラス（`frg-collapsible-indicator`）と状態の属性（`data-open`・`data-disabled`）を付ける。
 * ルートの `<details>` に `frg-collapsible` のクラスを、見出しに `frg-collapsible-summary` のクラスを付け、
 * `design` の値は `<details>` の `style` に CSS 変数として設定する。
 *
 * @param Indicator 組み込む開閉の印
 * @param displayName 作った部品の `displayName`
 * @returns 見た目を付けた折りたためる部品
 */
export default function createCollapsible<
  I extends CollapsibleIndicatorComponent,
>(Indicator: I, displayName: string): CollapsibleComponent<I> {
  // 組み込んだ印ごとの props の型は CollapsibleProps で決めるので、中では型を広げて描く
  const CollapsibleBase = withCollapsible({
    Indicator: createIndicatorPart('frg-collapsible-indicator', Indicator),
  }) as unknown as ComponentType<Record<string, unknown>>;

  function Collapsible({
    design,
    fallbackDesign,
    ...props
  }: CollapsibleProps<I>): ReactElement {
    return (
      <CollapsibleBase
        {...mergePartProps<Record<string, unknown>>(
          {
            className: 'frg-collapsible',
            style: createDesignStyle(
              'frg-collapsible',
              collapsibleDesignDefinition,
              design,
              fallbackDesign,
            ),
            partsProps: { summary: { className: 'frg-collapsible-summary' } },
          },
          props as Record<string, unknown>,
        )}
      />
    );
  }

  // withDesign（react-contract）が、design を重ねるときに読む
  Collapsible.designDefinition = collapsibleDesignDefinition;
  Collapsible.displayName = displayName;

  return Collapsible;
}
