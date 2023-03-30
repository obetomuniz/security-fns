import { createMetaTag } from "../shared"

export function addReferrerPolicyMetaTag(): void {
  document.head.appendChild(createMetaTag("referrer", "no-referrer"))
}
