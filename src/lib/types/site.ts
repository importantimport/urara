export type SiteConfig = {
  /** @deprecated - use `description` instead */
  descr?: string
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
  author: {
    name: string
    photo?: string
    status?: string
    bio?: string
    github?: string
    twitter?: string
    pgp?: {
      text: string
      link: string
    }
  }
  /** for web app manifest only.
   * ```
   * "background_color": {site.themeColor},
   * "theme_color": {site.themeColor}
   * ```
   */
  themeColor?: string
}
