async function importSecretKey(rawKey: ArrayBuffer): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  )
}

export async function encrypt(
  text: string,
  secretKey: ArrayBuffer
): Promise<string> {
  const encoder = new TextEncoder()
  const encodedText = encoder.encode(text)
  const key = await importSecretKey(secretKey)

  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encryptedText = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encodedText
  )

  const combinedBuffer = new Uint8Array(iv.length + encryptedText.byteLength)
  combinedBuffer.set(iv)
  combinedBuffer.set(new Uint8Array(encryptedText), iv.length)

  return btoa(String.fromCharCode.apply(null, Array.from(combinedBuffer)))
}

export async function decrypt(
  encryptedText: string,
  secretKey: ArrayBuffer
): Promise<string> {
  const encryptedBytes = Uint8Array.from(atob(encryptedText), (c) =>
    c.charCodeAt(0)
  )
  const iv = encryptedBytes.slice(0, 12)
  const encryptedData = encryptedBytes.slice(12)

  const key = await importSecretKey(secretKey)
  const decryptedBytes = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encryptedData
  )

  const decoder = new TextDecoder()
  return decoder.decode(decryptedBytes)
}
