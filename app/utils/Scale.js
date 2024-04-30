import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as CONST from './Constants';

const isTablet = height / width < 1.6; //aspectRatio = height/width;

/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 */
export default function (units = 1) {
  return (width / CONST.SCREEN_WIDTH) * (isTablet ? units : units);
}

const verticalScale = (size) =>
  (height / CONST.SCREEN_HEIGHT) * (isTablet ? size + 6 : size);

const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

const ifIphoneX = (iphoneXStyle, regularStyle) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

const getStatusBarHeight = (safe) => {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: 0,
    default: 0,
  });
};

const getBottomSpace = () => {
  return isIphoneX() ? 34 : 0;
};

export {verticalScale, isTablet, isIphoneX, getStatusBarHeight, getBottomSpace};
