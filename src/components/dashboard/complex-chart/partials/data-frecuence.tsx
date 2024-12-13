import { useEffect, useMemo, useState } from 'react'

import Label from '@/components/ui/label'

export default function DataFrecuence({ originalData, setNewData }: any) {
  const frecuences = {
    quarter: '15 minutes',
    day: 'Diary',
    week: 'Weekly',
    month: 'Monthly',
    annual: 'Anually',
  }
  const [frecuency, setFrecuency] = useState<keyof typeof frecuences>('quarter')

  const calculatedData = useMemo(() => {
    return groupByFrequency(originalData, frecuency)
  }, [originalData, frecuency])

  useEffect(() => {
    setNewData(calculatedData)
  }, [calculatedData])

  return (
    <Label className='w-full text-sm'>
      Data frecuency:
      <select
        className='input-style min-w-[180px]'
        defaultValue={frecuency}
        onChange={(e) =>
          setFrecuency(e.target.value as keyof typeof frecuences)
        }
      >
        {Object.entries(frecuences).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </Label>
  )
}

const getISOWeekNumber = (date: Date) => {
  const firstJan = new Date(date.getFullYear(), 0, 1)
  const daysOffset = (firstJan.getDay() + 6) % 7
  const firstThursday = new Date(
    firstJan.getFullYear(),
    0,
    1 + (4 - daysOffset)
  )
  const weekNumber = Math.ceil(
    ((date.getTime() - firstThursday.getTime()) / 86400000 + 1) / 7
  )
  return weekNumber
}

const groupByFrequency = (data: Record<string, any>[], frequency: string) => {
  try {
    const groupedData: Record<string, Record<any, number>> = {}

    const formatters: Record<string, (date: Date) => string> = {
      quarter: (d: Date) =>
        `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${Math.floor(d.getMinutes() / 15) * 15}`,
      day: (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      week: (d: Date) => {
        const year = d.getFullYear()
        const weekNumber = getISOWeekNumber(d)

        const firstDayOfWeek = new Date(year, 0, 1 + (weekNumber - 1) * 7)
        const dayOfWeek = firstDayOfWeek.getDay()
        const daysToAdd = dayOfWeek === 0 ? 1 : -dayOfWeek + 1
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + daysToAdd)

        const formattedDate = `${firstDayOfWeek.getFullYear()}-${String(firstDayOfWeek.getMonth() + 1).padStart(2, '0')}-${String(firstDayOfWeek.getDate()).padStart(2, '0')}`

        return formattedDate
      },
      month: (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      annual: (d: Date) => `${d.getFullYear()}`,
      default: (d: Date) =>
        `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
    }

    data.forEach(({ date, values }) => {
      const d = new Date(date)
      const key = (formatters[frequency] || formatters.default)(d)

      groupedData[key] = groupedData[key] || {}
      ;(Object.keys(values) as any).forEach((k: any) => {
        groupedData[key][k] = (groupedData[key][k] || 0) + values[k]
      })
    })

    return groupedData
  } catch {
    return []
  }
}
