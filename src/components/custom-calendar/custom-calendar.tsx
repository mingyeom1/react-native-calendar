import React, {Fragment} from 'react'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {CalendarHeader} from './calendar-header/calendar-header'
import {CustomCalendarWeekHeader} from './custom-calendar-week-header/custom-calendar-week-header'
import {useViewModel} from './custom-calendar.hook'
import styles from './custom-calendar.styles'
import {Week} from './week/week'

export const CustomCalendar = () => {
  const viewModel = useViewModel()

  const dragY = useSharedValue(0)
  const startY = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = dragY.value
    })
    .onUpdate((e) => {
      dragY.value = Math.min(viewModel.MAX_DRAG, Math.max(0, startY.value - e.translationY))
    })

  const gestureAreaStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      backgroundColor: 'white',
      height: dragY.value,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
    }
  })

  const calendarStyle = useAnimatedStyle(() => {
    return {
      height: viewModel.FULL_HEIGHT - dragY.value,
      overflow: 'hidden',
    }
  })

  return (
    <Fragment>
      <Animated.View style={[styles.calendar, calendarStyle]}>
        <CalendarHeader month={viewModel.month} onNext={viewModel.onNextMonth} onPrev={viewModel.onPrevMonth} />
        <CustomCalendarWeekHeader />

        {viewModel.weeks.map((week, weekIndex) => (
          <Week key={weekIndex} index={weekIndex} viewModel={viewModel} week={week} dragY={dragY} />
        ))}
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={gestureAreaStyle} />
      </GestureDetector>
    </Fragment>
  )
}
