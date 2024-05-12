export async function request(path, data, method = 'POST') {
  const apiUrl = import.meta.env.VITE_API_URL
  const fullUrl = `${apiUrl}/${path}`

  try {
    const fetchData = {
      method,
      headers: {
        'Content-Type': 'application/json',
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
    return [error, null]
  }
}
