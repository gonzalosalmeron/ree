import Navbar from '@/components/dashboard/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  )
}
