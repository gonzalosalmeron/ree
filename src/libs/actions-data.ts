const API_URL = 'https://apidatos.ree.es'

export const fetcher = <T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const url = new URL(path, API_URL).toString()
  return fetch(url, init).then((res) => {
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.')
    }
    return res.json()
  })
}

export const getGenerationStructure = async () => {
  // await new Promise((resolve) => setTimeout(() => resolve('a'), 2000))
  const date = getCurrentDate()

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await fetcher<Record<string, any>>(
      `/en/datos/generacion/estructura-generacion?start_date=${date}T00:00&end_date=${date}T23:59&time_trunc=day`,
      { cache: 'no-cache' }
    )

    return res
  } catch {
    return null
  }
}

export const getCurrentDate = () => {
  const [date] = new Date().toISOString().split('T')
  return date
}
