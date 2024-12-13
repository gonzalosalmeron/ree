import { Suspense } from 'react'

import HistoricalData from '@/components/dashboard/complex-chart/HistoricData'
import GenerationStructure, {
  SkeletonGenerationStructure,
} from '@/components/dashboard/generation-structure'

export default function Page() {
  return (
    <section className='min-h-screen py-4'>
      <div className='width-layout pb-4'>
        <h3 className='text-xl font-semibold text-primary/90'>
          Welcome again!
        </h3>
        <p className='text-sm text-secondary-foreground'>
          You can access to energy data here.
        </p>
      </div>
      <div className='flex flex-col gap-6'>
        <Suspense fallback={<SkeletonGenerationStructure />}>
          <GenerationStructure />
        </Suspense>
        <HistoricalData />
        {/* <Suspense fallback={<SkeletonCharRealTimeMarketPlaces />}>
        <CharRealTimeMarketPlaces />
      </Suspense> */}
      </div>
    </section>
  )
}
