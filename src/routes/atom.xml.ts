import type { EndpointOutput } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { feed } from '$lib/config/misc'
import { genPosts } from '$lib/utils/posts'

const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title><![CDATA[${site.title}]]></title>
  ${site.subtitle ? `<subtitle><![CDATA[${site.subtitle}]]></subtitle>` : ''}
  <link href="${site.url}" />
  <link href="${site.url}/atom.xml" rel="self" />
  ${feed.hub !== false ? `<link href="${feed.hub}" rel="hub"/>` : ''}
  <updated>${new Date().toJSON()}</updated>
  <author>
    <name><![CDATA[${site.author.name}]]></name>
  </author>
  <id>${site.url}/</id>
  ${Object.entries(await genPosts())
    .flatMap(([key, value]) => (+key > 0 ? value : []))
    .map((post, index) => {
      if (feed.limit === 0 || index < feed.limit)
        return `<entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${site.url + post.path}" />
    <id>${site.url + post.path}</id>
    <published>${new Date((post.date ??= '2021-11-01')).toJSON()}</published>
    <updated>${new Date(post.lastmod ?? post.date).toJSON()}</updated>${
          post.descr ? `\n    <summary type="html"><![CDATA[${post.descr.toString()}]]></summary>` : ''
        }
    <content type="html">
      <![CDATA[${post.html}]]>
    </content>
  </entry>`
    })
    .join('\n  ')}
</feed>`

export const get = async (): Promise<EndpointOutput> => ({
  headers: {
    'Content-Type': 'application/atom+xml; charset=utf-8'
  },
  body: await render()
})
