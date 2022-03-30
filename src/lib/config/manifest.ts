import { site } from '$lib/config/site'
import { icon } from '$lib/config/icon'

export const manifest = {
  name: site.title,
  shortName: site.title,
  lang: site.lang,
  description: site.descr,
  id: `${site.protocol + site.domain}/`,
  startUrl: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  backgroundColor: site.themeColor,
  themeColor: site.themeColor,
  icons: [...Object.values(icon).slice(2)]
}
