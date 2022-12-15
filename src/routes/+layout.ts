import type { LayoutLoad } from './$types'
export const prerender = true
export const trailingSlash = 'always'
export const load: LayoutLoad = async ({ url, fetch }) => ({
  path: url.pathname,
  res: await fetch('/posts.json').then(res => res.json())
})
