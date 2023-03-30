export interface CSPDirective {
  [directive: string]: DirectiveValue | DirectiveFunction
}

export interface CSPConfig {
  directives: CSPDirective
  reportUri?: string
  nonce?: string
}

export type DirectiveValue = string | string[]

export type DirectiveFunction = () => DirectiveValue
