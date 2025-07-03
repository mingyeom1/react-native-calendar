import { Dimensions, Platform, StatusBar } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export const isIos = Platform.OS === 'ios';
export const WIDTH =
  initialWindowMetrics?.frame.width || Dimensions.get('window').width;
export const HEIGHT =
  !isIos && Number(Platform.Version) >= 29
    ? Dimensions.get('window').height + StatusBar.currentHeight!
    : Dimensions.get('window').height;

export const pixelRatio = (
  designSize: number,
  round?: 'floor' | 'ceil' | 'round',
) => {
  const rationalWidth = WIDTH * (designSize / 390);
  switch (round) {
    case 'floor':
      return Math.floor(rationalWidth);
    case 'ceil':
      return Math.ceil(rationalWidth);
    case 'round':
      return Math.round(rationalWidth);
    default:
      return rationalWidth;
  }
};
