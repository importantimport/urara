/// <reference lib="webworker" />

import { build, files, version } from '$service-worker'
import { registerRoute } from 'workbox-routing'
import { precacheAndRoute, precache } from 'workbox-precaching'
import { StaleWhileRevalidate } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

const pages = [
  ...(build
    .filter(url => url.includes('/_app/pages/') && url.includes('/index'))
    .map(
      url =>
        (url = url
          .replace('_app/pages', '')
          .replace(/\/index(.*?).js/g, '')
          .replace('//', '/'))
    ) as unknown as string[])
]

self.addEventListener('message', event => {
  if (event?.data.type === 'SKIP_WAITING') self.skipWaiting()
})

precache(pages.map(url => ({ url, revision: `${version}` })))

precacheAndRoute([...build.map(url => ({ url, revision: null })), ...files.map(url => ({ url, revision: `${version}` }))])

registerRoute(({ url }) => pages.includes(url.pathname), new StaleWhileRevalidate({}))
