import { addNonceToNodesAutomatically } from "../shared"

export function createScriptTagWithNonce(src: string, nonce: string): void {
  const script = document.createElement("script")
  script.src = src
  script.setAttribute("nonce", nonce)
  document.head.appendChild(script)
}

export function addNonceToTags(tagName: string, nonce: string): void {
  const tags = document.getElementsByTagName(tagName)

  for (let i = 0; i < tags.length; i++) {
    tags[i].setAttribute("nonce", nonce)
  }
}

export function addNonceToScriptTags(nonce: string): void {
  addNonceToTags("script", nonce)
}

export function addNonceToStyleTags(nonce: string): void {
  addNonceToTags("style", nonce)
}

export function addNonceToScriptTagsAutomatically(nonce: string): void {
  addNonceToNodesAutomatically("script", nonce)
}

export function addNonceToStyleTagsAutomatically(nonce: string): void {
  addNonceToNodesAutomatically("style", nonce)
}
