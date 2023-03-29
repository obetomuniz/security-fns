export function safeJSON<T = unknown>(data: string): T | null {
  try {
    return JSON.parse(data) as T
  } catch {
    return null
  }
}
