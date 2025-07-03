import React from 'react'
import {Text, View} from 'react-native'
import styles from './custom-calendar-week-header.styles'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

export const CustomCalendarWeekHeader = () => {
  return (
    <View style={styles.weekContainer}>
      {DAYS.map((day) => (
        <Text key={day} style={styles.dayLabel}>
          {day}
        </Text>
      ))}
    </View>
  )
}
