import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {CustomCalendar} from '~/components/custom-calendar/custom-calendar'
import styles from './calendar.styles'

export const CalendarScreen = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <CustomCalendar />
    </SafeAreaView>
  )
}
