import { CSPConfig, generateCSP } from "../../isomorphic/csp/csp"

export function addReferrerPolicy(): void {
  const meta = document.createElement("meta")
  meta.setAttribute("name", "referrer")
  meta.setAttribute("content", "no-referrer")
  document.head.appendChild(meta)
}

export function createScriptTagWithNonce(src: string, nonce: string): void {
  const script = document.createElement("script")
  script.src = src
  script.setAttribute("nonce", nonce)
  document.head.appendChild(script)
}

export function addNonceToScriptTags(nonce: string): void {
  const scriptTags = document.getElementsByTagName("script")
  for (const scriptTag of scriptTags) {
    if (!scriptTag.src) {
      scriptTag.setAttribute("nonce", nonce)
    }
  }
}

export function addNonceToStyleTags(nonce: string): void {
  const styleTags = document.getElementsByTagName("style")
  for (const styleTag of styleTags) {
    styleTag.setAttribute("nonce", nonce)
  }
}

export function addCSPHeader(cspConfig: CSPConfig) {
  const cspHeader = generateCSP(cspConfig)
  const meta = document.createElement("meta")
  meta.setAttribute("http-equiv", "Content-Security-Policy")
  meta.setAttribute("content", cspHeader)
  document.head.appendChild(meta)
}

export function addNonceToScriptTagsAutomatically(nonce: string): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "SCRIPT" && !node.src) {
            ;(node as HTMLScriptElement).setAttribute("nonce", nonce)
          }
        })
      }
    })
  })

  observer.observe(document, { childList: true, subtree: true })
}

export function addNonceToStyleTagsAutomatically(nonce: string): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "STYLE") {
            ;(node as HTMLStyleElement).setAttribute("nonce", nonce)
          }
        })
      }
    })
  })

  observer.observe(document, { childList: true, subtree: true })
}
