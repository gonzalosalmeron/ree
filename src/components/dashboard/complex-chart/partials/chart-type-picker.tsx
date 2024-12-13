import { SetStateAction } from 'react'

import Label from '@/components/ui/label'

export const ChartOptions = {
  line: 'Lines',
  column: 'Column',
  area: 'Areas',
}

export default function ChartTypePicker({
  chartType,
  setChartType,
}: {
  chartType: string
  setChartType: React.Dispatch<SetStateAction<string>>
}) {
  return (
    <Label className='w-full text-sm'>
      Chart Type:
      <select
        defaultValue={chartType}
        className='input-style'
        onChange={(e: any) => setChartType(e.target.value)}
      >
        {Object.entries(ChartOptions).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </Label>
  )
}
