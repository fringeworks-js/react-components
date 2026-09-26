import withMatrixLayout from '@niche-works/react-layout/core/withMatrixLayout';
import NwrBlock from '../../base/NwrBlock';

const NwrMatrixLayoutContainer = withMatrixLayout(NwrBlock, {
  displayName: 'NwrMatrixLayoutContainer',
  className: 'nwr-matrixlayoutcontainer',
});
export default NwrMatrixLayoutContainer;
