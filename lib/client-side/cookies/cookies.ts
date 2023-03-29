export function setSameSiteCookie(
  name: string,
  value: string,
  days: number,
  sameSite: "strict" | "lax" | "none" = "lax"
): void {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;SameSite=${sameSite};Secure`
}

export function setCookie(name: string, value: string, days: number): void {
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}${expires}; path=/; Secure; SameSite=Strict`
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift())
  }
  return null
}

export function deleteCookie(name: string): void {
  setCookie(name, "", -1)
}
