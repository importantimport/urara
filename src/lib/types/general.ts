export type ThemeConfig = {
  name: string
  text?: string
}[]

export interface HeadConfig {
  custom?: (params: { dev: boolean, page?: Urara.Page, post?: Urara.Post }) => string[]
  me?: string[]
}

export interface HeaderConfig {
  nav?: {
    children?: {
      link: string
      text: string
    }[]
    link?: string
    text: string
  }[]
  search?: {
    colors?: boolean
    provider: 'duckduckgo' | 'google'
  }
}

export interface FooterConfig {
  html?: string
  nav?: {
    link: string
    text: string
  }[]
  since?: string
}

export interface DateConfig { locales: string, options: Intl.DateTimeFormatOptions }

export interface FeedConfig {
  /** WebSub (formerly PubSubHubbub) hubs. one per line */
  hubs?: string[]
  /** feed entry limit. */
  limit?: number
}
