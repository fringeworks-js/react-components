import createContainerModel from '../_shared/createContainerModel';
import type { LayoutName, StoryArgs } from '../_shared/types';
import LayoutContainer from './LayoutContainer';
import LAYOUTS from './layouts';

export default function createRenderer(name: LayoutName) {
  const component = LAYOUTS[name];
  return (args: StoryArgs) => (
    <LayoutContainer component={component} model={createContainerModel(args)} />
  );
}
