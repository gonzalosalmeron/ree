import { useMemo, useRef } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { ChartOptions } from '@/components/dashboard/complex-chart/partials/chart-type-picker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractSeriesData = (data: any, key: string) => {
  return Object.keys(data ?? {}).map((day: string) => ({
    x: new Date(day).getTime(),
    y: data[day][key],
  }))
}

export default function ChartEnergy({
  data,
  value,
  chartType,
}: {
  data: any
  value: string
  chartType: string
}) {
  const chartOptions = useMemo<Highcharts.Options>(
    () => ({
      accessibility: {
        enabled: false,
      },
      title: {
        text: 'Energy',
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Valores',
        },
      },
      series: [
        {
          name: value,
          type: chartType as keyof typeof ChartOptions,
          data: extractSeriesData(data, value),
        },
      ],
    }),
    [data, value, chartType]
  )

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  console.log(data)
  return (
    <div className='pt-4'>
      {data && (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartComponentRef}
        />
      )}
    </div>
  )
}
