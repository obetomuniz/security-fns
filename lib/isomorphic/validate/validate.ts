export function email(email: string): boolean {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  return regex.test(email)
}

export function isURLInAllowlist(url: string, allowlist: string[]): boolean {
  const parsedUrl = new URL(url)
  return allowlist.includes(parsedUrl.hostname)
}
