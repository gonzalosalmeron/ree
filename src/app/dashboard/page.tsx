import { Suspense } from 'react'

import CharRealTimeMarketPlaces, {
  SkeletonCharRealTimeMarketPlaces,
} from '@/components/dashboard/chart-real-time-market-places'

export default function Page() {
  return (
    <section>
      <Suspense fallback={<SkeletonCharRealTimeMarketPlaces />}>
        <CharRealTimeMarketPlaces />
      </Suspense>
    </section>
  )
}
