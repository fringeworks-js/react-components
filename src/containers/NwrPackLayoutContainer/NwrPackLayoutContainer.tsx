import withPackLayout from '@niche-works/react-layout/core/withPackLayout';
import NwrBlock from '../../base/NwrBlock';

const NwrPackLayoutContainer = withPackLayout(NwrBlock, {
  displayName: 'NwrPackLayoutContainer',
  className: 'nwr-packlayoutcontainer',
});
export default NwrPackLayoutContainer;
