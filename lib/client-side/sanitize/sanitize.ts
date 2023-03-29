export function sanitizeHTML(input: string): string {
  const div = document.createElement("div")
  div.textContent = input
  return div.innerHTML
}

export function sanitizeURL(url: string): string {
  const anchor = document.createElement("a")
  anchor.href = url
  return anchor.href
}
