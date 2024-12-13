import ChartLines from '@/components/ui/chart-lines'

import { getRealTimeMarketPlaces } from '@/libs/actions-data'

export default async function CharRealTimeMarketPlaces() {
  const data = await getRealTimeMarketPlaces()
  if (!data) return 'no data'

  const datasets = Object.keys(data).map((key: string) => ({
    label: key,
    data: (data[key]?.values as number[]) ?? [],
  }))

  return (
    <Card>
      <ChartLines
        data={{ datasets, labels: data[Object.keys(data)[0]]?.labels }}
      />
    </Card>
  )
}

export const SkeletonCharRealTimeMarketPlaces = () => (
  <Card>
    <div className='skeleton mt-4 aspect-[16/7] w-full max-w-xl rounded-md' />
  </Card>
)

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className='w-full bg-secondary px-8 py-6'>
    <div className='w-full max-w-xl'>
      <p className='text-sm font-medium text-secondary-foreground/60'>
        Real Time Marketplaces
      </p>
      {children}
    </div>
  </div>
)
