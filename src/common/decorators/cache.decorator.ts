type Entry<R> = { value: R; expiresAt: number }

export function Cache(ttl: number, keyFn: (...args: any[]) => string = () => '') {
  return <T extends (...args: any[]) => any>(
    _target: object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): void => {
    const originalVal = descriptor.value
    if (!originalVal) return

    const cache = new Map<string, Entry<ReturnType<T>>>()

    descriptor.value = function(this: object, ...args: Parameters<T>) {
      const key = keyFn(...args)
      const now = Date.now()
      const val = cache.get(key)
      if (val && val.expiresAt > now) return val.value

      const value = Reflect.apply(originalVal, this, args) as ReturnType<T>
      cache.set(key, { value, expiresAt: now + ttl })
      return value
    } as T
  }
}
export const MS = {
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000
} as const
