import { createMetaTag } from "../shared"

export function addCSPMetaTag(csp: string) {
  const meta = createMetaTag("Content-Security-Policy", csp)
  meta.setAttribute("http-equiv", "Content-Security-Policy")
  document.head.appendChild(meta)
}

export function addStrictCSPMetaTag(): void {
  addCSPMetaTag(
    "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self';"
  )
}
