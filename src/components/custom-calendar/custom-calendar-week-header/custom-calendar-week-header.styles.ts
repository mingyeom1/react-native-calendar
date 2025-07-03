import {StyleSheet} from 'react-native'
import {pixelRatio} from '~/commons/constants'

export const WEEK_HEADER_HEIGHT_HEIGHT = pixelRatio(36)

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: WEEK_HEADER_HEIGHT_HEIGHT,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
  },
})

export default styles
