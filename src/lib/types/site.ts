import type { FFFAuthor } from 'fff-flavored-frontmatter'

export type SiteConfig = {
  /** site protocol. for example: `https://` */
  protocol: string
  /** site domain. for example: `example.com` */
  domain: string
  /** site title. */
  title: string
  /** site subtitle. */
  subtitle?: string
  /** site lang. `<html lang={site.lang}>` */
  lang?: string
  /** site description. `<meta name="description" content={site.description}>` */
  description?: string
  /** site keywords. `<meta name="keywords" content={site.keywords}>` */
  keywords?: string[]
  author: Omit<FFFAuthor, 'url'> & {
    status?: string
    bio?: string
    metadata?: (
      | {
          text: string
          icon?: string
          link?: string
          rel?: string
        }
      | {
          text?: string
          icon: string
          link?: string
          rel?: string
        }
    )[]
  }
  /** for web app manifest only.
   * ```
   * "background_color": {site.themeColor},
   * "theme_color": {site.themeColor}
   * ```
   */
  themeColor?: string
}
