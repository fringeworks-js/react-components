import withPinLayout from '@niche-works/react-layout/core/withPinLayout';
import NwrBlock from '../../base/NwrBlock';

const NwrPinLayoutContainer = withPinLayout(NwrBlock, {
  displayName: 'NwrPinLayoutContainer',
  className: 'nwr-pinlayoutcontainer',
});
export default NwrPinLayoutContainer;
