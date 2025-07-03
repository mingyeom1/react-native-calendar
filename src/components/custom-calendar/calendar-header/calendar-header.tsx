import dayjs from 'dayjs'
import React from 'react'
import {Image, Text, View} from 'react-native'
import {CustomPressable} from '~/components/custom-pressable/custom-pressable'
import styles from './calendar-header.styles'

interface Props {
  month: dayjs.Dayjs
  onPrev: () => void
  onNext: () => void
}

export const CalendarHeader = ({month, onNext, onPrev}: Props) => {
  return (
    <View style={styles.container}>
      <CustomPressable onPress={onPrev} throttleDisabled>
        <Image source={require('~/assets/screens/calendar/arrow-prev.png')} style={styles.arrow} />
      </CustomPressable>
      <Text>{month.format('YYYY.MM')}</Text>
      <CustomPressable onPress={onNext} throttleDisabled>
        <Image source={require('~/assets/screens/calendar/arrow-next.png')} style={styles.arrow} />
      </CustomPressable>
    </View>
  )
}
