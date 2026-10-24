import useDeferUntilWebFontReady from '@fringeworks/react-defer-rendering/useDeferUntilWebFontReady';
import type { FC } from 'react';
import type { FrgWebFontBoundaryProps } from './types';

/**
 * 指定のフォントが読み込まれた後に子要素を表示するコンポーネント
 * @param props
 * @returns
 */
const FrgWebFontBoundary: FC<FrgWebFontBoundaryProps> = (
  props: FrgWebFontBoundaryProps,
) => {
  const { fonts, children, ...rest } = props;
  const { node } = useDeferUntilWebFontReady(children, fonts, rest);
  return node;
};
FrgWebFontBoundary.displayName = 'FrgWebFontBoundary';
export default FrgWebFontBoundary;
