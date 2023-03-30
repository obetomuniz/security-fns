# Content Security Policy

## Functions

### `createNonce`

```typescript
import { createNonce } from "security-fns"

const nonce: string = createNonce()
```

### `generateCSP`

```typescript
import { createNonce, generateCSP, CSPConfig } from "security-fns"

const csp: string = generateCSP({
  directives: {
    "default-src": ["'self'"],
    "script-src": ["'self'", (nonce) => `nonce-${nonce}`],
    "style-src": ["'self'", "fonts.googleapis.com"],
    "img-src": ["'self'", "img.example.com"],
    "connect-src": ["'self'", "api.example.com"],
    "font-src": ["'self'", "fonts.gstatic.com"],
    "object-src": ["'none'"],
  },
  reportUri: "https://csp-report.example.com",
  nonce: createNonce(),
})
```
