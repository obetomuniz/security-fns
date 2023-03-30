import { CSPConfig, DirectiveFunction, DirectiveValue } from "./types"

function serializeDirectiveValue(
  value: DirectiveValue,
  nonce?: string
): string {
  if (Array.isArray(value)) {
    return value.join(" ")
  }

  if (nonce) {
    return `${value} nonce-${nonce}`
  }

  return value
}

function serializeDirective(
  directive: string,
  value: DirectiveValue | DirectiveFunction,
  nonce?: string
): string {
  const serializedValue =
    typeof value === "function"
      ? serializeDirectiveValue(value(), nonce)
      : serializeDirectiveValue(value, nonce)
  return `${directive} ${serializedValue}`
}

export function generateCSP(cspConfig: CSPConfig): string {
  const { directives, reportUri, nonce } = cspConfig
  const serializedDirectives = Object.entries(directives).map(
    ([directive, value]) => serializeDirective(directive, value, nonce)
  )

  if (reportUri) {
    serializedDirectives.push(`report-uri ${reportUri}`)
  }

  return serializedDirectives.join("; ")
}
