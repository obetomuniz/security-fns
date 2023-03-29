export async function verifyJWT(
  token: string,
  publicKey: JsonWebKey
): Promise<boolean> {
  try {
    const [headerRaw, payloadRaw, signature] = token.split(".")
    const header = JSON.parse(atob(headerRaw))
    const payload = JSON.parse(atob(payloadRaw))

    if (!header || !payload) {
      return false
    }

    const importedKey = await crypto.subtle.importKey(
      "jwk",
      publicKey,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"]
    )

    const data = new TextEncoder().encode(headerRaw + "." + payloadRaw)
    const signatureBytes = Uint8Array.from(atob(signature), (c) =>
      c.charCodeAt(0)
    )

    const isValid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      importedKey,
      signatureBytes,
      data
    )

    return isValid
  } catch (error) {
    return false
  }
}
