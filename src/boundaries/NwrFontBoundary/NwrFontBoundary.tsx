import { useDeferUntilFontReady } from '@niche-works/react-defer-rendering';
import type { FC } from 'react';
import type { NwrFontBoundaryProps } from './types';

/**
 * 指定のフォントが読み込まれた後に子要素を表示するコンポーネント
 * @param props
 * @returns
 */
const NwrFontBoundary: FC<NwrFontBoundaryProps> = (
  props: NwrFontBoundaryProps,
) => {
  const { fontFamily, children, ...rest } = props;
  const { node } = useDeferUntilFontReady(children, fontFamily, rest);
  return node ?? <></>;
};
NwrFontBoundary.displayName = 'NwrFontBoundary';
export default NwrFontBoundary;
