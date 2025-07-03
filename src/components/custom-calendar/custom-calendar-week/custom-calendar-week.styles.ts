import {StyleSheet} from 'react-native'
import {pixelRatio} from '~/commons/constants'

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: pixelRatio(36),
    marginBottom: pixelRatio(8),
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
  },
})

export default styles
