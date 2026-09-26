import withStackLayout from '@niche-works/react-layout/core/withStackLayout';
import NwrBlock from '../../base/NwrBlock';

const NwrStackLayoutContainer = withStackLayout(NwrBlock, {
  displayName: 'NwrStackLayoutContainer',
  className: 'nwr-stacklayoutcontainer',
});
export default NwrStackLayoutContainer;
