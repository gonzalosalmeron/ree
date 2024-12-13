import Image from 'next/image'

import { getGenerationStructure } from '@/libs/actions-data'
import { cn } from '@/libs/utils'

export default async function GenerationStructure() {
  const data = await getGenerationStructure()

  return (
    <Card>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-y-4 pt-2'>
        {data?.included?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (generation: Record<string, any>, i: number) => {
            const title = generation?.type ?? 'Unkown'
            return (
              <div key={i} className='inline-block w-fit'>
                <p>
                  {generation?.attributes?.values?.[0].value?.toFixed(2) ??
                    '---'}
                </p>
                <p className='text-xs' title={title}>
                  <span
                    style={{ background: generation?.attributes?.color }}
                    className='mr-1 inline-flex h-2 w-2'
                  />

                  {title}
                </p>
              </div>
            )
          }
        )}
      </div>
    </Card>
  )
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className='flex items-center gap-6 px-6 py-4'>
    <Image
      src='/energy.avif'
      width={400}
      height={400}
      alt='Energy'
      className='w-64 mix-blend-multiply'
      priority
    />
    <div className='w-full'>
      <p className='text-xs font-medium uppercase text-secondary-foreground/60'>
        Generation structure by technology
      </p>

      {children}
    </div>
  </div>
)

export const SkeletonGenerationStructure = () => (
  <Card>
    <div
      className={cn(
        'col-span-2 grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-y-2 pt-4'
      )}
    >
      {Array(17)
        .fill('')
        .map((_: unknown, i: number) => (
          <div key={i} className='skeleton h-12 w-11/12 rounded-md' />
        ))}
    </div>
  </Card>
)
