import Image from 'next/image'

export default function Brand() {
  return (
    <div className='flex items-center gap-2'>
      <Image
        width={300}
        height={40}
        src='/logo.avif'
        className='w-16'
        alt='REE'
      />
      <p className='text-lg font-bold uppercase'>Ree</p>
    </div>
  )
}
