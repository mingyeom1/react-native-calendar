import {StyleSheet} from 'react-native'
import {pixelRatio} from '~/commons/constants'

const styles = StyleSheet.create({
  cell: {
    width: `${100 / 7}%`,
    height: pixelRatio(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: pixelRatio(36),
    height: pixelRatio(36),
    borderRadius: pixelRatio(100),
  },
  dot: {
    width: pixelRatio(4),
    height: pixelRatio(4),
    borderRadius: pixelRatio(2),
    backgroundColor: 'skyblue',
    position: 'absolute',
    bottom: pixelRatio(2),
  },
  nextStar: {
    width: pixelRatio(4),
    height: pixelRatio(4),
    position: 'absolute',
    bottom: pixelRatio(2),
  },
})

export default styles
