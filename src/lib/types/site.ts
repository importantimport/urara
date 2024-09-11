import type { FFFAuthor } from 'fff-flavored-frontmatter'

export interface SiteConfig {
  author: {
    bio?: string
    metadata?: (
      | {
          text?: string
          icon: string
          link?: string
          rel?: string
        }
      | {
        icon?: string
        link?: string
        rel?: string
        text: string
      }
    )[]
    status?: string
  } & Omit<FFFAuthor, 'url'>
  /** site description. `<meta name="description" content={site.description}>` */
  description?: string
  /** site domain. for example: `example.com` */
  domain: string
  /** site keywords. `<meta name="keywords" content={site.keywords}>` */
  keywords?: string[]
  /** site lang. `<html lang={site.lang}>` */
  lang?: string
  /** site protocol. for example: `https://` */
  protocol: string
  /** site subtitle. */
  subtitle?: string
  /**
   * for web app manifest only.
   * ```
   * "background_color": {site.themeColor},
   * "theme_color": {site.themeColor}
   * ```
   */
  themeColor?: string
  /** site title. */
  title: string
}
