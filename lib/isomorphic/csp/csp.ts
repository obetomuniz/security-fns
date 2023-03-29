export interface CSPDirective {
  [directive: string]: DirectiveValue | DirectiveFunction
  nonce?: string
}

export interface CSPConfig {
  directives: CSPDirective
  reportUri?: string
  nonce?: string
}

type DirectiveValue = string | string[] | (() => string | string[])

type DirectiveFunction = () => DirectiveValue

export function createNonce() {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}

function serializeDirectiveValue(
  value: DirectiveValue,
  nonce?: string
): string {
  if (typeof value === "string") {
    if (nonce && value === "'self'") {
      return `'nonce-${nonce}'`
    }
    return value
  }

  if (Array.isArray(value)) {
    if (nonce) {
      value = [...value, `'nonce-${nonce}'`]
    }
    return value.join(" ")
  }

  return value()
}

export function generateCSP(cspConfig: CSPConfig): string {
  const { directives, reportUri, nonce } = cspConfig
  const serializedDirectives = []

  for (const [directive, value] of Object.entries(directives)) {
    let serializedValue = serializeDirectiveValue(value)

    if (directives[directive].nonce) {
      serializedValue = serializeDirectiveValue(
        value,
        directives[directive].nonce
      )
    } else if (nonce) {
      serializedValue = serializeDirectiveValue(value, nonce)
    }

    serializedDirectives.push(`${directive} ${serializedValue}`)
  }

  if (reportUri) {
    serializedDirectives.push(`report-uri ${reportUri}`)
  }

  return serializedDirectives.join("; ")
}
