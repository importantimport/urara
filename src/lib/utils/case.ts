export const toSnake = (obj: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.replace(/([A-Z])/g, '_$1').toLowerCase(), v]))

export const toCamel = (obj: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k.toLowerCase().replace(/([-_][a-z])/g, g => g.slice(-1).toUpperCase()), v])
  )
