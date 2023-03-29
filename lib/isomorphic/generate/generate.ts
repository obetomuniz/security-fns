export function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function randomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const randomValues = crypto.getRandomValues(new Uint8Array(length))

  return Array.from(
    randomValues,
    (value) => characters[value % characters.length]
  ).join("")
}

export function randomNumber(min: number, max: number): number {
  const range = max - min + 1
  const byteArray = new Uint32Array(1)
  crypto.getRandomValues(byteArray)
  const randomNumber = (byteArray[0] % range) + min
  return randomNumber
}
