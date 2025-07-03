import dayjs, {Dayjs} from 'dayjs'
import React, {useMemo} from 'react'
import {Text, View} from 'react-native'
import {CustomPressable} from '~/components/custom-pressable/custom-pressable'
import styles from './custom-calendar-day.styles'

interface Props {
  date: Dayjs
  isCurrentMonth: boolean
  currentDate: Dayjs
  onPressDay: (date: Dayjs) => void
}
export const CustomCalendarDay = ({date, isCurrentMonth, currentDate, onPressDay}: Props) => {
  const dateString = useMemo(() => date?.format('YYYY-MM-DD'), [date])

  const isSelected = useMemo(() => dateString === currentDate.format('YYYY-MM-DD'), [currentDate, dateString])
  const isFuture = useMemo(() => date.isAfter(dayjs(), 'day'), [date])

  const selectedViewStyle = useMemo(
    () =>
      isSelected && {
        borderWidth: 1,
        borderColor: 'skyblue',
      },
    [isSelected],
  )

  const textStyle = useMemo(
    () => [{color: '#000000'}, isFuture && {color: '#A4A4A4'}, !isCurrentMonth && {color: '#D5D5D5'}],
    [isCurrentMonth, isFuture],
  )

  return (
    <CustomPressable style={[styles.cell]} onPress={() => onPressDay(date)}>
      <View style={[styles.dateContainer, selectedViewStyle]}>
        <Text style={textStyle}>{date.date()}</Text>
      </View>
    </CustomPressable>
  )
}
