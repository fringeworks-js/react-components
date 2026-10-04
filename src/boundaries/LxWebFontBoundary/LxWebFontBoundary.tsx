import useDeferUntilWebFontReady from '@fringeworks/react-defer-rendering/useDeferUntilWebFontReady';
import applyDefaultProps from '@fringeworks/react-utils/utils/applyDefaultProps';
import type { FC } from 'react';
import type { LxWebFontBoundaryProps } from './types';

/**
 * 指定のフォントが読み込まれた後に子要素を表示するコンポーネント
 * @param props
 * @returns
 */
const LxWebFontBoundary: FC<LxWebFontBoundaryProps> = (
  props: LxWebFontBoundaryProps,
) => {
  const { fonts, children, ...rest } = applyDefaultProps(props, {
    children: <></>,
    pending: <></>,
    fallback: <></>,
  });
  const { node } = useDeferUntilWebFontReady(children, fonts, rest);
  return node;
};
LxWebFontBoundary.displayName = 'LxWebFontBoundary';
export default LxWebFontBoundary;
