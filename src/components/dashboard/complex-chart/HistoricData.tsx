'use client'

import { useState } from 'react'

import useFetcher from '@/hooks/useFetcher'

import ChartEnergy from '@/components/dashboard/complex-chart/partials/chart-energy'
import ChartTypePicker from '@/components/dashboard/complex-chart/partials/chart-type-picker'
import DataFrecuence from '@/components/dashboard/complex-chart/partials/data-frecuence'
import DatePicker from '@/components/dashboard/complex-chart/partials/date-picker'
import ValuePicker from '@/components/dashboard/complex-chart/partials/value-picker'
import { IconSpinner } from '@/components/icons/icon-spinner'
import Button from '@/components/ui/button'
import Container from '@/components/ui/container'

const API_URL = (dateFrom: string, dateTo: string) =>
  dateFrom && dateTo
    ? `https://stg-app.energysequence.com/v2/datalog/?meter=5d12082581c1e06964703077&date_from=${dateFrom}&date_to=${dateTo}`
    : null

export default function HistoricalData() {
  const [dates, setDates] = useState<Dates>({
    from: '',
    to: '2024-05-10',
  })
  const [data, setData] = useState(null)
  const [value, setValue] = useState<keyof ApiValue>('Energía Activa')
  const [chartType, setChartType] = useState('line')
  const [showChart, setShowChart] = useState(false)
  const {
    data: apiResponse,
    loading,
    error,
    refetch,
  } = useFetcher(API_URL(dates.from, dates.to))

  return (
    <Container
      title='Historical data'
      className='border-y border-border px-6 pb-9 pt-4'
    >
      <div className='flex flex-col items-end gap-6 pt-4 xl:flex-row'>
        <DatePicker dates={dates} setDates={setDates} />
        <DataFrecuence originalData={apiResponse} setNewData={setData} />
        <ValuePicker value={value} setValue={setValue} />
        <ChartTypePicker chartType={chartType} setChartType={setChartType} />
        <Button
          onClick={() => {
            setShowChart(true)
            refetch()
          }}
          disabled={loading || !dates.from || !dates.to || !value || !chartType}
          className='flex h-fit shrink-0 items-center gap-2 bg-accent text-sm font-medium text-accent-foreground'
        >
          Generate Data {loading && <IconSpinner />}
        </Button>
      </div>

      <div className='pt-4'>
        {error ? (
          <div className='rounded-md bg-red-100 px-4 py-2 text-sm text-red-500'>
            {error}
          </div>
        ) : (
          <>
            {loading && (
              <div className='flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 py-4 text-sm text-zinc-900'>
                Loading data... <IconSpinner className='animate-spin' />
              </div>
            )}
            {data && showChart && !loading && (
              <ChartEnergy data={data} value={value} chartType={chartType} />
            )}
          </>
        )}
      </div>
    </Container>
  )
}
