import { Suspense } from 'react'

import CharRealTimeMarketPlaces, {
  SkeletonCharRealTimeMarketPlaces,
} from '@/components/dashboard/chart-real-time-market-places'
import GenerationStructure, {
  SkeletonGenerationStructure,
} from '@/components/dashboard/generation-structure'

export default function Page() {
  return (
    <section>
      <Suspense fallback={<SkeletonGenerationStructure />}>
        <GenerationStructure />
      </Suspense>
      <Suspense fallback={<SkeletonCharRealTimeMarketPlaces />}>
        <CharRealTimeMarketPlaces />
      </Suspense>
    </section>
  )
}
