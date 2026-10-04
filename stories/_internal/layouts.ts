/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import { createElement } from 'react';
import FrgLayoutContainer from '../../src/containers/FrgLayoutContainer';
import type { LayoutName } from '../_shared/types';

/**
 * `layout`を固定したFrgLayoutContainer
 * @param layout レイアウト名
 * @returns
 */
function fixLayout(layout: LayoutName): ComponentType<any> {
  const FixedLayoutContainer = (props: any) =>
    createElement(FrgLayoutContainer, { ...props, layout });
  FixedLayoutContainer.displayName = `FrgLayoutContainer(${layout})`;
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
