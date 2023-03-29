export async function secureFetch(
  url: string,
  method: string,
  data: Record<string, any>,
  token: string
): Promise<Response> {
  const config = {
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  }

  try {
    const response = await fetch(url, config)
    return response.json()
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}
