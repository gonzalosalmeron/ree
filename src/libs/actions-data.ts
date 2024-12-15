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

export const getGenerationStructure = async (): Promise<Record<
  string,
  any
> | null> => {
  // Set the initial date
  const currentDate = new Date(getCurrentDate())
  const maxRetries = 3

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const [formattedDate] = currentDate.toISOString().split('T')

    try {
      const res = await fetcher<Record<string, any>>(
        `/en/datos/generacion/estructura-generacion?start_date=${formattedDate}T00:00&end_date=${formattedDate}T23:59&time_trunc=day`,
        { cache: 'no-cache' }
      )

      return { ...res, data: { ...res?.data, date: formattedDate } }
    } catch (error) {
      console.error(`Error fetching data for ${formattedDate}:`, error)
      currentDate.setDate(currentDate.getDate() - 1)
    }
  }

  console.error('Failed to fetch data after 3 attempts.')
  return null
}

export const getCurrentDate = () => {
  const [date] = new Date().toISOString().split('T')
  return date
}
