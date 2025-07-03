import {StyleSheet} from 'react-native'
import {pixelRatio} from '~/commons/constants'

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'white',
    borderRadius: pixelRatio(18),
    paddingTop: pixelRatio(8),
    paddingBottom: pixelRatio(16),
    paddingHorizontal: pixelRatio(6),
  },
  row: {
    flexDirection: 'row',
  },

  cell: {
    width: `${100 / 7}%`,
    height: pixelRatio(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pixelRatio(6),
  },
  dateContainer: {
    alignItems: 'center',
  },
})

export default styles
