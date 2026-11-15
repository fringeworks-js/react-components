import { createDesignStyle } from '@fringeworks/react-contract';
import { mergePartProps } from '@fringeworks/react-parts-props';
import { type ButtonParts, withButton } from '@fringeworks/react-primitives';
import type { ComponentType, ReactElement } from 'react';
import { buttonDesignDefinition } from './constants';
import type { ButtonProps } from './types';

/**
 * react-primitives の `withButton` に部品を組み込み、`frg-button` のクラスと `design` の CSS 変数を付けたボタンを作る
 *
 * `Button` と `withButtonIcon` で共通に使う。
 *
 * @param parts react-primitives の `withButton` に組み込む部品
 * @param displayName 作ったボタンの `displayName`
 * @returns 見た目を付けたボタン
 */
export default function createButton<P extends ButtonParts>(
  parts: P,
  displayName: string,
) {
  // 組み込める部品かは、呼ぶ側（Button・withButtonIcon）の型で確かめている。
  // 組み込んだ部品ごとの props の型は ButtonProps で決めるので、中では型を広げて描く
  const ButtonBase: ComponentType<Record<string, unknown>> = withButton<P>(
    parts as never,
  ) as never;

  function Button<V = undefined>({
    design,
    fallbackDesign,
    ...props
  }: ButtonProps<V, P>): ReactElement {
    return (
      <ButtonBase
        {...mergePartProps<Record<string, unknown>>(
          {
            className: 'frg-button',
            style: createDesignStyle(
              'frg-button',
              buttonDesignDefinition,
              design,
              fallbackDesign,
            ),
          },
          props as Record<string, unknown>,
        )}
      />
    );
  }

  // withDesign（react-contract）が、design を重ねるときに読む
  Button.designDefinition = buttonDesignDefinition;
  Button.displayName = displayName;

  return Button;
}
