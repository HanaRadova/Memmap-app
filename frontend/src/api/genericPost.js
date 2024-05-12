export async function request(
  path: string,
  data?: any,
  method: string = 'POST'
): Promise<[Error | null, any | null]> {
  const apiUrl = import.meta.env.VITE_API_URL
  const fullUrl = `${apiUrl}/${path}`

  const headersValue = {
    userKey: localStorage.getItem('userKey'),
    isAdmin: localStorage.getItem('isAdmin'),
    soloTest: localStorage.getItem('soloTest'),
    duoTest: localStorage.getItem('duoTest'),
  }

  try {
    const fetchData: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': JSON.stringify(headersValue),
      },
    }

    if (data !== undefined) {
      fetchData.body = JSON.stringify(data)
    }

    const response = await fetch(fullUrl, fetchData)

    if (!response.ok) {
      try {
        const result = await response.json()
        return [new Error(result.message), null]
      } catch {}
      throw new Error(
        `API call failed: ${response.status} - ${response.statusText}`
      )
    }

    const result = await response.json()
    return [null, result]
  } catch (error) {
    return [error as Error, null]
  }
}
