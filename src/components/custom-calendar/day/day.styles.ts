import {StyleSheet} from 'react-native'
import {pixelRatio} from '~/commons/constants'

export const DAY_HEIGHT = pixelRatio(36)

const styles = StyleSheet.create({
  cell: {
    width: `${100 / 7}%`,
    height: DAY_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: pixelRatio(36),
    height: DAY_HEIGHT,
    borderRadius: pixelRatio(18),
  },
})

export default styles
