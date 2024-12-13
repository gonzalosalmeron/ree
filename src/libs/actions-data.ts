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

export const getRealTimeMarketPlaces = async () => {
  const date = getCurrentDate()

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await fetcher<Record<string, any>>(
      `/en/datos/mercados/precios-mercados-tiempo-real?start_date=${date}T00:00&end_date=${date}T23:59&time_trunc=hour`,
      { cache: 'no-cache' }
    )

    const data = res.included.reduce(
      (
        acc: Record<string, Record<string, Array<number | string>>>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        curr: any
      ) => {
        const title = curr?.attributes?.title ?? 'unkown'
        const values = curr?.attributes?.values ?? []
        if (!acc[curr?.attributes?.title]) acc[title] = {}

        acc[title]['labels'] = []
        acc[title]['values'] = []
        values.forEach(
          ({ value, datetime }: { value: number; datetime: string }) => {
            acc[title]['labels'].push(
              new Date(datetime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })
            )
            acc[title]['values'].push(value)
          }
        )

        return acc
      },
      {}
    )

    return data as Record<string, Record<string, Array<number | string>>>
  } catch {
    return null
  }
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
