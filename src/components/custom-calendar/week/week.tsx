import {Dayjs} from 'dayjs'
import React from 'react'
import Animated, {interpolate, SharedValue, useAnimatedStyle} from 'react-native-reanimated'
import {CALENDAR_HEADER_HEIGHT} from '../calendar-header/calendar-header.styles'
import {CustomCalendarDay} from '../custom-calendar-day/custom-calendar-day'
import {DAY_HEIGHT} from '../custom-calendar-day/custom-calendar-day.styles'
import {WEEK_HEADER_HEIGHT_HEIGHT} from '../custom-calendar-week-header/custom-calendar-week-header.styles'
import {useViewModel} from '../custom-calendar.hook'
import styles from './week.styles'

interface Props {
  viewModel: ReturnType<typeof useViewModel>
  week: {
    date: Dayjs
    isCurrentMonth: boolean
  }[]
  index: number
  dragY: SharedValue<number>
}

export const Week = ({viewModel, week, index, dragY}: Props) => {
  const style = useAnimatedStyle(() => {
    if (index === viewModel.selectedWeekIndex) {
      return {
        height: DAY_HEIGHT,
        opacity: 1,
      }
    } else {
      return {
        height: interpolate(
          dragY.value,
          [0, viewModel.FULL_HEIGHT - DAY_HEIGHT - CALENDAR_HEADER_HEIGHT - WEEK_HEADER_HEIGHT_HEIGHT],
          [DAY_HEIGHT, 0],
          'clamp',
        ),
        opacity: interpolate(
          dragY.value,
          [0, viewModel.FULL_HEIGHT - DAY_HEIGHT - CALENDAR_HEADER_HEIGHT - WEEK_HEADER_HEIGHT_HEIGHT],
          [1, 0],
          'clamp',
        ),
      }
    }
  })

  return (
    <Animated.View key={index} style={[styles.row, style]}>
      {week.map(({date, isCurrentMonth}, _index) => (
        <CustomCalendarDay
          key={_index}
          currentDate={viewModel.selectedDate}
          date={date}
          isCurrentMonth={isCurrentMonth}
          onPressDay={() => {
            viewModel.onPressDay(date)
          }}
        />
      ))}
    </Animated.View>
  )
}
