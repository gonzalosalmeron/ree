import Container from '../ui/container'
import Image from 'next/image'

import { getGenerationStructure } from '@/libs/actions-data'
import { cn } from '@/libs/utils'

export default async function GenerationStructure() {
  const data = await getGenerationStructure()

  return (
    <Card date={data?.data?.date}>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-y-4 pt-2'>
        {data?.included?.map((generation: Record<string, any>, i: number) => {
          const title = generation?.type ?? 'Unkown'
          return (
            <div key={i} className='inline-block w-fit'>
              <p>
                {generation?.attributes?.values?.[0].value?.toFixed(2) ?? '---'}
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
        })}
      </div>
    </Card>
  )
}

const Card = ({
  date,
  children,
}: {
  date: string
  children: React.ReactNode
}) => (
  <Container title={`Generation structure by technology (${date})`}>
    <div className='flex items-center gap-10'>
      <Image
        src='/energy.avif'
        width={400}
        height={400}
        alt='Energy'
        className='hidden w-64 md:block'
        priority
      />
      <div className='w-full'>{children}</div>
    </div>
  </Container>
)

export const SkeletonGenerationStructure = () => (
  <Card date='xxxx-xx-xx'>
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
