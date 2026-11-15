import type { IconComponent } from '@fringeworks/react-contract';
import getComponentName from '../_internal/_getComponentName';
import createButton from './_createButton';
import type { ButtonWithIconComponent } from './types';

/**
 * アイコンの部品を組み込んだ、見た目を付けたボタンを作る HOC
 *
 * 作ったボタンは `Button` と同じプロパティに加えて、中身の前に置くアイコンの名前 `icon` と、後ろに置く `endIcon` を受け取る
 * （型は組み込んだ部品の `value` の型）。アイコンのセットはアプリで1回決め、使う場所では名前だけを渡す。
 * アイコンの部品には `value` と `partsProps.icon` を渡す（react-primitives の `withButton` の `Icon`）。
 *
 * @example
 * export const IconButton = withButtonIcon(MaterialSymbolOutlined);
 *
 * <IconButton icon="save">保存</IconButton>;
 *
 * @param Icon アイコンの部品（react-icon とそのアダプターの部品など、react-contract の `IconSlotProps` を受け取るもの）
 * @returns アイコンを置けるボタン
 */
export default function withButtonIcon<I extends IconComponent>(
  Icon: I,
): ButtonWithIconComponent<I> {
  return createButton(
    { Icon },
    `withButtonIcon(${getComponentName(Icon)})`,
  ) as ButtonWithIconComponent<I>;
}
