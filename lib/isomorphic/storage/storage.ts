const _storage = new WeakMap()

export class SecureStorage {
  constructor() {
    _storage.set(this, {})
  }

  setItem(key: string, value: unknown): void {
    _storage.get(this)[key] = value
  }

  getItem(key: string): unknown {
    return _storage.get(this)[key]
  }

  removeItem(key: string): void {
    delete _storage.get(this)[key]
  }
}
