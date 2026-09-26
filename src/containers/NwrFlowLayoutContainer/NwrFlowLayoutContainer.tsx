import withFlowLayout from '@niche-works/react-layout/core/withFlowLayout';
import NwrBlock from '../../base/NwrBlock';

const NwrFlowLayoutContainer = withFlowLayout(NwrBlock, {
  displayName: 'NwrFlowLayoutContainer',
  className: 'nwr-flowlayoutcontainer',
});
export default NwrFlowLayoutContainer;
