'use client'

import React, { useMemo, useState } from 'react'

import { VariableSizeList as List } from 'react-window'
import useSWRInfinite from 'swr/infinite'

import Button from '@/components/ui/button'
import Container from '@/components/ui/container'

import { fetcher } from '@/libs/actions-data'

const ROW_HEIGHT = 50

interface TableRow {
  title: string
  color: string
  date: string
  emissionValue: number
  percentage: number
}

export default function TableCo2(): JSX.Element {
  const [startDate] = useState<Date>(new Date('2015-01-01T00:00:00'))

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.included.length) return null

    const nextStartDate = new Date(startDate)
    nextStartDate.setMonth(startDate.getMonth() + pageIndex * 2)
    const nextEndDate = new Date(nextStartDate)
    nextEndDate.setMonth(nextEndDate.getMonth() + 2)

    return `/en/datos/generacion/no-renovables-detalle-emisiones-CO2?start_date=${nextStartDate.toISOString()}&end_date=${nextEndDate.toISOString()}&time_trunc=day&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741`
  }

  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher)

  const tableData: TableRow[] = useMemo(() => {
    if (!data) return []

    return data.flatMap((page: any) =>
      page.included.flatMap((item: any) => {
        const { title, color } = item.attributes

        return item.attributes.values.map((value: any) => ({
          title,
          color,
          date: value.datetime,
          emissionValue: value.value.toFixed(2),
          percentage: value.percentage,
        }))
      })
    )
  }, [data])

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const row = tableData[index]
    return (
      <div
        className='grid grid-cols-5 border-b text-sm text-primary'
        style={{
          ...style,
        }}
      >
        <div className='px-4 py-2'>
          {new Date(row.date).toLocaleDateString()}
        </div>
        <div className='truncate py-2 pl-5 pr-4'>{row.title}</div>
        <div className='py-2 pl-5 pr-4'>
          <div
            className='h-4 w-11/12 rounded'
            style={{ background: row.color }}
          />
        </div>
        <div className='py-2 pl-6 pr-4'>{row.emissionValue}</div>
        <div className='py-2 pl-7 pr-4'>
          {(row.percentage * 100).toFixed(2)}%
        </div>
      </div>
    )
  }

  return (
    <Container title='Co2 Emissions'>
      <div className='relative overflow-x-auto pt-4'>
        <div className='grid w-full grid-cols-5 text-left text-sm'>
          <div className='sticky top-0 border-b bg-background px-4 py-2 text-xs uppercase text-primary'>
            Date
          </div>
          <div className='sticky top-0 border-b bg-background px-4 py-2 text-xs uppercase text-primary'>
            Title
          </div>
          <div className='sticky top-0 border-b bg-background px-4 py-2 text-xs uppercase text-primary'>
            Color
          </div>
          <div className='sticky top-0 truncate border-b bg-background px-4 py-2 text-xs uppercase text-primary'>
            Emission Value
          </div>
          <div className='sticky top-0 border-b bg-background px-4 py-2 text-xs uppercase text-primary'>
            Percentage
          </div>
        </div>
        <List
          height={400}
          itemCount={tableData.length}
          itemSize={() => ROW_HEIGHT}
          width='100%'
        >
          {({ index, style }) => Row({ index, style })}
        </List>
        <div className='mt-4 flex items-center justify-between text-sm font-medium'>
          <Button
            className='bg-gray-300 text-gray-700 disabled:opacity-50'
            disabled={isValidating || size === 1}
            onClick={() => setSize(size - 1)}
          >
            Previous
          </Button>
          <Button
            className='bg-accent text-white disabled:opacity-50'
            disabled={isValidating}
            onClick={() => setSize(size + 1)}
          >
            {isValidating ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      </div>
    </Container>
  )
}
