import NwrBlock from '../../base/NwrBlock';
import withLayout from '../../hocs/withLayout';
import type { NwrLayoutContainerProps } from './types';

const NwrLayoutContainer = withLayout<NwrLayoutContainerProps, HTMLDivElement>(
  NwrBlock,
  {
    displayName: 'NwrLayoutContainer',
    className: 'nwr-layoutcontainer',
  },
);
export default NwrLayoutContainer;
