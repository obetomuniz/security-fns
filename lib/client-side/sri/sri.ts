export async function addScriptWithSRI(src: string): Promise<void> {
  const response = await fetch(src)
  const scriptContent = await response.text()
  const hashBuffer = await crypto.subtle.digest(
    "SHA-384",
    new TextEncoder().encode(scriptContent)
  )
  const base64Hash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))

  const script = document.createElement("script")
  script.src = src
  script.integrity = `sha384-${base64Hash}`
  script.crossOrigin = "anonymous"
  document.head.appendChild(script)
}

export async function addStylesheetWithSRI(href: string): Promise<void> {
  const response = await fetch(href)
  const stylesheetContent = await response.text()
  const hashBuffer = await crypto.subtle.digest(
    "SHA-384",
    new TextEncoder().encode(stylesheetContent)
  )
  const base64Hash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))

  const link = document.createElement("link")
  link.href = href
  link.rel = "stylesheet"
  link.integrity = `sha384-${base64Hash}`
  link.crossOrigin = "anonymous"
  document.head.appendChild(link)
}
