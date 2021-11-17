export const toSnake = (str: string): string =>
  str.charAt(0).toLowerCase() +
  str
    .slice(1)
    .replace(/([A-Z]+)/g, '_$1')
    .toLowerCase()

export const toCamel = (str: string): string => str.toLowerCase().replace(/([-_][a-z])/g, g => g.slice(-1).toUpperCase())
