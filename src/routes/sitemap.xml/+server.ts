import type { RequestHandler } from './$types'
import { site } from '$lib/config/site'
import { genPosts } from '$lib/utils/posts'

const render = (): string => `<?xml version='1.0' encoding='utf-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${site.protocol + site.domain}</loc>
    </url>
    ${genPosts()
      .map(
        post => `
        <url>
            <loc>${site.protocol + site.domain + post.path}</loc>
            <lastmod>${new Date(post.updated ?? post.published ?? post.created).toISOString()}</lastmod>
            <priority>0.5</priority>
        </url>`
      )
      .join('')}
</urlset>`

export const prerender = true
export const GET: RequestHandler = async () =>
  new Response(render(), {
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  })
