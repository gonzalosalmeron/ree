import { SetStateAction } from 'react'

import Input from '@/components/ui/input'

export default function DatePicker({
  dates,
  setDates,
}: {
  dates: Dates
  setDates: React.Dispatch<SetStateAction<Dates>>
}) {
  return (
    <div className='flex w-full gap-6 text-sm'>
      <Input
        label='From'
        type='date'
        placeholder='Desde'
        value={dates?.from}
        onChange={(e) =>
          setDates((old: Dates) => ({ ...old, from: e.target.value }))
        }
        max={dates?.to || new Date().toISOString().split('T')[0]}
      />
      <Input
        label='To'
        type='date'
        value={dates?.to}
        onChange={(e) =>
          setDates((old: Dates) => ({ ...old, to: e.target.value }))
        }
        min={dates?.from}
        max={new Date('2024-05-10').toISOString().split('T')[0]}
        placeholder='Desde'
      />
    </div>
  )
}
