import withTileLayout from '@niche-works/react-layout/core/withTileLayout';
import NwrBlock from '../../base/NwrBlock';

const NwrTileLayoutContainer = withTileLayout(NwrBlock, {
  displayName: 'NwrTileLayoutContainer',
  className: 'nwr-tilelayoutcontainer',
});
export default NwrTileLayoutContainer;
