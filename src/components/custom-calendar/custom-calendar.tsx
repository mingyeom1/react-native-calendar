import React, {Fragment} from 'react'
import {GestureDetector} from 'react-native-gesture-handler'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'
import {useViewModel} from './custom-calendar.hook'
import styles from './custom-calendar.styles'
import {Header} from './header/header'
import {WeekHeader} from './week-header/week-header'
import {Week} from './week/week'

export const CustomCalendar = () => {
  const viewModel = useViewModel()

  const gestureAreaStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      height: viewModel.dragY.value,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#dddddd',
    }
  })

  const calendarStyle = useAnimatedStyle(() => {
    return {
      height: viewModel.FULL_HEIGHT - viewModel.dragY.value,
      overflow: 'hidden',
    }
  })

  return (
    <Fragment>
      <Animated.View style={[styles.calendar, calendarStyle]}>
        <Header month={viewModel.month} onNext={viewModel.onNextMonth} onPrev={viewModel.onPrevMonth} />
        <WeekHeader />
        {viewModel.weeks.map((week, weekIndex) => (
          <Week key={weekIndex} index={weekIndex} viewModel={viewModel} week={week} />
        ))}
      </Animated.View>
      <GestureDetector gesture={viewModel.panGesture}>
        <Animated.View style={gestureAreaStyle} />
      </GestureDetector>
    </Fragment>
  )
}
