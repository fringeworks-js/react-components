import withLayout from '@fringeworks/react-layouts/withLayout';
import LxBlock from '../../base/LxBlock';

const LxLayoutContainer = withLayout(LxBlock, {
  displayName: 'LxLayoutContainer',
  className: 'lx-layoutcontainer',
});
export default LxLayoutContainer;
