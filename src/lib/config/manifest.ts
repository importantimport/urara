import { site } from '$lib/config/site'
import { icons } from '$lib/config/icons'

export const manifest = {
  name: site.title,
  shortName: site.title,
  lang: site.lang,
  description: site.descr,
  id: `${site.url}/`,
  startUrl: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  backgroundColor: site.themeColor,
  themeColor: site.themeColor,
  icons: [...Object.values(icons).slice(2)]
}
