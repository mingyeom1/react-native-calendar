import dayjs, {Dayjs} from 'dayjs'
import React, {useCallback, useMemo, useState} from 'react'
import {View} from 'react-native'
import {CalendarHeader} from './calendar-header/calendar-header'
import {CustomCalendarDay} from './custom-calendar-day/custom-calendar-day'
import {CustomCalendarWeek} from './custom-calendar-week/custom-calendar-week'
import styles from './custom-calendar.styles'

interface Props {
  onPressDay?: (date: Dayjs) => void
  nextDate?: string
}

export const CustomCalendar = (props: Props) => {
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

  return (
    <View>
      <View style={styles.calendar}>
        <CalendarHeader month={month} onNext={onNextMonth} onPrev={onPrevMonth} />
        <CustomCalendarWeek />

        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={[styles.row, weekIndex !== weeks.length - 1 && {marginBottom: 8}]}>
            {week.map(({date, isCurrentMonth}, index) => (
              <CustomCalendarDay
                key={index}
                currentDate={selectedDate}
                date={date}
                isCurrentMonth={isCurrentMonth}
                onPressDay={() => {
                  onPressDay(date)
                  props.onPressDay?.(date)
                }}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
