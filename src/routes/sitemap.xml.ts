import type { RequestHandler } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { genPosts } from '$lib/utils/posts'

const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
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

export const get: RequestHandler = async () => ({
  headers: {
    'Content-Type': 'application/xml; charset=utf-8'
  },
  body: await render()
})
