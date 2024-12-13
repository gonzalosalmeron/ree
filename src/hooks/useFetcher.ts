import { useCallback, useState } from 'react'

export default function useFetcher(key: string | null) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    if (!key) {
      setError('You must select dates')
      return
    }
    setLoading(true)
    setError(null)
    const cache = sessionStorage.getItem(key)

    if (cache) {
      setData(JSON.parse(cache))
      setLoading(false)
      return
    }

    try {
      const response = await fetch(key)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()

      // save on sessionStorage if possible
      try {
        sessionStorage.setItem(key, JSON.stringify(result))
      } catch (storageError) {
        console.error(
          "[WARNING] Couldn't store data in sessionStorage:",
          storageError
        )
      }

      if (result?.error) {
        setError(result.error)
      } else {
        setData(result)
      }
    } catch (e) {
      console.error("[ERROR] Couldn't fetch data:", e)
      setError('Error fetching data')
    } finally {
      setLoading(false)
    }
  }, [key])

  return { data, error, loading, refetch: fetchData }
}
