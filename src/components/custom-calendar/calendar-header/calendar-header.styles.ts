import {StyleSheet} from 'react-native'
import {pixelRatio} from '~/commons/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: pixelRatio(56),
    marginBottom: pixelRatio(10),
  },
  arrow: {
    width: pixelRatio(32),
    height: pixelRatio(32),
  },
})

export default styles
