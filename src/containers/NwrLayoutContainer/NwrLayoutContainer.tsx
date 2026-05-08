import NwrBox from '../../base/NwrBox';
import withLayout from '../../hocs/withLayout';
import type { NwrLayoutContainerProps } from './types';

const NwrLayoutContainer = withLayout<NwrLayoutContainerProps, HTMLDivElement>(
  NwrBox,
  {
    displayName: 'NwrLayoutContainer',
  },
);
export default NwrLayoutContainer;
