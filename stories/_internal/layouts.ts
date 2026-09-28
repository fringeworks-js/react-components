/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import { createElement } from 'react';
import LxLayoutContainer from '../../src/containers/LxLayoutContainer';
import type { LayoutName } from '../_shared/types';

/**
 * `layout`を固定したLxLayoutContainer
 * @param layout レイアウト名
 * @returns
 */
function fixLayout(layout: LayoutName): ComponentType<any> {
  const FixedLayoutContainer = (props: any) =>
    createElement(LxLayoutContainer, { ...props, layout });
  FixedLayoutContainer.displayName = `LxLayoutContainer(${layout})`;
  return FixedLayoutContainer;
}

/**
 * storyで表示するレイアウト
 */
const LAYOUTS: Record<LayoutName, ComponentType<any>> = {
  balance: fixLayout('balance'),
  center: fixLayout('center'),
  flow: fixLayout('flow'),
  layer: fixLayout('layer'),
  matrix: fixLayout('matrix'),
  pack: fixLayout('pack'),
  pin: fixLayout('pin'),
  stack: fixLayout('stack'),
  tile: fixLayout('tile'),
};
export default LAYOUTS;
