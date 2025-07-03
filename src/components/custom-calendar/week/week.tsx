import {Dayjs} from 'dayjs'
import React from 'react'
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated'
import {useViewModel} from '../custom-calendar.hook'
import {Day} from '../day/day'
import {DAY_HEIGHT} from '../day/day.styles'
import {CALENDAR_HEADER_HEIGHT} from '../header/header.styles'
import {WEEK_HEADER_HEIGHT_HEIGHT} from '../week-header/week-header.styles'
import styles from './week.styles'

interface Props {
  index: number
  week: {
    date: Dayjs
    isCurrentMonth: boolean
  }[]
  viewModel: ReturnType<typeof useViewModel>
}

export const Week = ({viewModel, week, index}: Props) => {
  const style = useAnimatedStyle(() => {
    if (index === viewModel.selectedWeekIndex) {
      return {
        height: DAY_HEIGHT,
        opacity: 1,
      }
    } else {
      return {
        height: interpolate(
          viewModel.dragY.value,
          [0, viewModel.FULL_HEIGHT - DAY_HEIGHT - CALENDAR_HEADER_HEIGHT - WEEK_HEADER_HEIGHT_HEIGHT],
          [DAY_HEIGHT, 0],
          'clamp',
        ),
        opacity: interpolate(
          viewModel.dragY.value,
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
        <Day
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
