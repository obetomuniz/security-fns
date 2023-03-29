export async function password(
  password: string,
  salt: string
): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}
