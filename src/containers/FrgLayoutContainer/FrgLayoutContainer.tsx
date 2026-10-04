import withLayout from '@fringeworks/react-layouts/withLayout';
import FrgBlock from '../../base/FrgBlock';

const FrgLayoutContainer = withLayout(FrgBlock, {
  displayName: 'FrgLayoutContainer',
  className: 'frg-layoutcontainer',
});
export default FrgLayoutContainer;
