import {StyleSheet} from 'react-native'
import {pixelRatio} from '~/commons/constants'

export const CALENDAR_HEADER_HEIGHT = pixelRatio(56)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: CALENDAR_HEADER_HEIGHT,
  },
  arrow: {
    width: pixelRatio(32),
    height: pixelRatio(32),
  },
})

export default styles
