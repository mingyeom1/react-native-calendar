import {useCallback, useMemo, useState} from 'react'
import dayjs, {Dayjs} from 'dayjs'
import {CALENDAR_HEADER_HEIGHT} from './calendar-header/calendar-header.styles'
import {DAY_HEIGHT} from './custom-calendar-day/custom-calendar-day.styles'
import {WEEK_HEADER_HEIGHT_HEIGHT} from './custom-calendar-week-header/custom-calendar-week-header.styles'

export const useViewModel = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [month, setMonth] = useState(dayjs())

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

  const onPressDay = useCallback((date: Dayjs) => {
    setSelectedDate(date)
  }, [])

  const onNextMonth = useCallback(() => setMonth((prevMonth) => prevMonth.add(1, 'month')), [])
  const onPrevMonth = useCallback(() => setMonth((prevMonth) => prevMonth.subtract(1, 'month')), [])

  const weeks = useMemo(() => {
    const result: {date: Dayjs; isCurrentMonth: boolean}[][] = []
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7))
    }
    return result
  }, [days])

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
  }
}
