export function createMetaTag(name: string, content: string): HTMLMetaElement {
  const meta = document.createElement("meta")
  meta.setAttribute("name", name)
  meta.setAttribute("content", content)
  return meta
}

export function addNonceToNodesAutomatically(
  tagName: keyof HTMLElementTagNameMap,
  nonce: string
): void {
  const upperCaseTagName = tagName.toUpperCase()
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === upperCaseTagName) {
            ;(node as HTMLElement).setAttribute("nonce", nonce)
          }
        })
      }
    })
  })

  observer.observe(document, { childList: true, subtree: true })
}
