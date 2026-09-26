import withBalanceLayout from '@niche-works/react-layout/core/withBalanceLayout';
import NwrBlock from '../../base/NwrBlock';

const NwrBalanceLayoutContainer = withBalanceLayout(NwrBlock, {
  displayName: 'NwrBalanceLayoutContainer',
  className: 'nwr-balancelayoutcontainer',
});
export default NwrBalanceLayoutContainer;
