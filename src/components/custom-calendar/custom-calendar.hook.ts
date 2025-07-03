import {useCallback, useMemo, useState} from 'react'
import dayjs, {Dayjs} from 'dayjs'
import {CALENDAR_HEADER_HEIGHT} from './header/header.styles'
import {DAY_HEIGHT} from './day/day.styles'
import {WEEK_HEADER_HEIGHT_HEIGHT} from './week-header/week-header.styles'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import {Gesture} from 'react-native-gesture-handler'

export const useViewModel = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [month, setMonth] = useState(dayjs())
  const dragY = useSharedValue(0)
  const startY = useSharedValue(0)

  const days = useMemo(() => {
    const start = month.startOf('month')
    const end = month.endOf('month')
    const totalDays = end.date()

    const startWeek = start.day()

    const prevMonth = month.subtract(1, 'month')
    const nextMonth = month.add(1, 'month')
    const daysInPrevMonth = prevMonth.endOf('month').date()

    const result: {
      date: Dayjs
      isCurrentMonth: boolean
    }[] = []

    for (let i = startWeek - 1; i >= 0; i--) {
      const date = prevMonth.date(daysInPrevMonth - i)
      result.push({date, isCurrentMonth: false})
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = month.date(d)
      result.push({date, isCurrentMonth: true})
    }

    const filled = result.length
    const shouldFillTo = filled <= 35 ? 35 : 42

    const remaining = shouldFillTo - filled
    for (let i = 1; i <= remaining; i++) {
      const date = nextMonth.date(i)
      result.push({date, isCurrentMonth: false})
    }

    return result
  }, [month])

  const weeks = useMemo(() => {
    const result: {date: Dayjs; isCurrentMonth: boolean}[][] = []
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7))
    }
    return result
  }, [days])

  const onPressDay = useCallback((date: Dayjs) => {
    setSelectedDate(date)
  }, [])

  const onNextMonth = useCallback(() => setMonth((prevMonth) => prevMonth.add(1, 'month')), [])
  const onPrevMonth = useCallback(() => setMonth((prevMonth) => prevMonth.subtract(1, 'month')), [])

  const selectedWeekIndex = useMemo(
    () => weeks.findIndex((week) => week.some((d) => d.date.isSame(selectedDate, 'day'))),
    [weeks, selectedDate],
  )

  const weekCount = useMemo(() => weeks.length, [weeks.length])

  const FULL_HEIGHT = useMemo(
    () => DAY_HEIGHT * weekCount + CALENDAR_HEADER_HEIGHT + WEEK_HEADER_HEIGHT_HEIGHT,
    [weekCount],
  )
  const MAX_DRAG = useMemo(() => DAY_HEIGHT * (weekCount - 1), [weekCount])

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = dragY.value
    })
    .onUpdate((e) => {
      dragY.value = Math.min(MAX_DRAG, Math.max(0, startY.value - e.translationY))
    })
    .onEnd(() => {
      const THRESHOLD = MAX_DRAG * 0.15

      if (dragY.value >= MAX_DRAG - THRESHOLD) {
        dragY.value = withTiming(MAX_DRAG)
      } else if (dragY.value <= THRESHOLD) {
        dragY.value = withTiming(0)
      } else {
        const toValue = dragY.value > MAX_DRAG / 2 ? MAX_DRAG : 0
        dragY.value = withTiming(toValue)
      }
    })

  return {
    selectedDate,
    month,
    days,
    onPressDay,
    onNextMonth,
    onPrevMonth,
    weeks,
    FULL_HEIGHT,
    MAX_DRAG,
    selectedWeekIndex,
    panGesture,
    dragY,
  }
}
