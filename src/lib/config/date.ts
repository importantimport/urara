export const dateConfig = (type: string): { locales: string; options: Intl.DateTimeFormatOptions } => {
  const locales = 'en-US'
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }
  if (type === 'layout') options.year = 'numeric'
  return { locales, options }
}
