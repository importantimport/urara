import type { IconConfig } from '$lib/types/icon'
import { site } from '$lib/config/site'

export const icon: IconConfig = {
  favicon: {
    src: site.protocol + site.domain + '/favicon.png',
    sizes: '48x48',
    type: 'image/png'
  },
  appleTouchIcon: {
    src: site.protocol + site.domain + '/assets/any@180.png',
    sizes: '180x180',
    type: 'image/png'
  },
  any192: {
    src: site.protocol + site.domain + '/assets/any@192.png',
    sizes: '192x192',
    type: 'image/png',
    purpose: 'any'
  },
  any512: {
    src: site.protocol + site.domain + '/assets/any@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any'
  },
  maskable192: {
    src: site.protocol + site.domain + '/assets/maskable@192.png',
    sizes: '192x192',
    type: 'image/png',
    purpose: 'maskable'
  },
  maskable512: {
    src: site.protocol + site.domain + '/assets/maskable@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
}
