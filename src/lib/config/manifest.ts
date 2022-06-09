import { site } from '$lib/config/site'
import { any, maskable } from '$lib/config/icon'

export const manifest = {
  name: site.title,
  shortName: site.title,
  lang: site.lang,
  description: site.description,
  id: `${site.protocol + site.domain}/`,
  startUrl: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  backgroundColor: site.themeColor,
  themeColor: site.themeColor,
  icons: [
    ...Object.values(any)
      .filter(icon => icon.sizes !== '180x180')
      .map(icon => ({ ...icon, purpose: 'any' })),
    ...Object.values(maskable).map(icon => ({ ...icon, purpose: 'maskable' }))
  ]
}
