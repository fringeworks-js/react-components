import useDeferUntilFontReady from '@niche-works/react-defer-rendering/useDeferUntilFontReady';
import applyDefaultProps from '@niche-works/react-utils/utils/applyDefaultProps';
import type { FC } from 'react';
import type { LxFontBoundaryProps } from './types';

/**
 * 指定のフォントが読み込まれた後に子要素を表示するコンポーネント
 * @param props
 * @returns
 */
const LxFontBoundary: FC<LxFontBoundaryProps> = (
  props: LxFontBoundaryProps,
) => {
  const { fontFamily, children, ...rest } = applyDefaultProps(props, {
    children: <></>,
    pending: <></>,
    fallback: <></>,
  });
  const { node } = useDeferUntilFontReady(children, fontFamily, rest);
  return node;
};
LxFontBoundary.displayName = 'LxFontBoundary';
export default LxFontBoundary;
