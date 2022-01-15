import type { EndpointOutput } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { feed } from '$lib/config/misc'
import { icons } from '$lib/config/icons'
import { genPosts } from '$lib/utils/posts'
import { genTags } from '$lib/utils/tags'

const render = async (): Promise<string> => {
  const posts = Object.entries(await genPosts())
    .flatMap(([key, value]) => (+key > 0 ? value : []))
    .sort((a, b) => (b.date ?? '1989-06-04').localeCompare(a.date ?? '1989-06-04'))
    .filter((_, index) => feed.limit === 0 || index < feed.limit)
  const tags = genTags(posts)
  return `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${site.url}/</id>
  <title><![CDATA[${site.title}]]></title>
  ${site.subtitle ? `<subtitle><![CDATA[${site.subtitle}]]></subtitle>` : ''}
  ${icons.favicon ? `<icon>${icons.favicon.src}</icon>` : ''}
  <link href="${site.url}" />
  <link href="${site.url}/atom.xml" rel="self" type="application/atom+xml" />
  ${feed.hub !== false ? `<link href="${feed.hub}" rel="hub"/>` : ''}
  <updated>${new Date().toJSON()}</updated>
  <author>
    <name><![CDATA[${site.author.name}]]></name>
  </author>
  ${Object.keys(tags)
    .map(tag => `<category term="${tag}" scheme="${site.url}/?tags=${encodeURI(tag)}" />`)
    .join('\n')}
  ${posts
    .map(
      post => `<entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${site.url + post.path}" />
    <id>${site.url + post.path}</id>
    <published>${new Date((post.date ??= '2021-11-01')).toJSON()}</published>
    <updated>${new Date(post.lastmod ?? post.date).toJSON()}</updated>
    ${post.descr ? `<summary type="html"><![CDATA[${post.descr.toString()}]]></summary>` : ''}
    <content type="html">
      <![CDATA[${post.html}]]>
    </content>
    ${post.tags ? post.tags.map(tag => `<category term="${tag}" scheme="${site.url}/?tags=${encodeURI(tag)}" />`).join('\n') : ''}
  </entry>`
    )
    .join('\n')}
</feed>`
}

export const get = async (): Promise<EndpointOutput> => ({
  headers: {
    'Content-Type': 'application/atom+xml; charset=utf-8'
  },
  body: await render()
})
