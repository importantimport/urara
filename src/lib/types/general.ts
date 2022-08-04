export type ThemeConfig = {
  text?: string
  name: string
}[]

export type HeadConfig = {
  custom?: (params: { dev: boolean; post?: Urara.Post; page?: Urara.Page }) => string[]
  me?: string[]
}

export type HeaderConfig = {
  nav?: {
    text: string
    link?: string
    children?: {
      text: string
      link: string
    }[]
  }[]
  search?: {
    provider: 'google' | 'duckduckgo'
    colors?: boolean
  }
}

export type FooterConfig = {
  nav?: {
    text: string
    link: string
  }[]
  html?: string
  since?: string
}

export type DateConfig = { locales: string; options: Intl.DateTimeFormatOptions }

export type FeedConfig = {
  /** feed entry limit. */
  limit?: number
  /** WebSub (formerly PubSubHubbub) hubs. one per line */
  hubs?: string[]
}
