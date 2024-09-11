import { feed } from '$lib/config/general'
import { favicon } from '$lib/config/icon'
import { site } from '$lib/config/site'
import { genPosts, genTags } from '$lib/utils/posts'

import type { RequestHandler } from './$types'

const render = (posts = genPosts({ filterUnlisted: true, postHtml: true, postLimit: feed.limit })): string =>
  `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${site.protocol + site.domain}/</id>
  <title><![CDATA[${site.title}]]></title>${site.subtitle ? `\n  <subtitle><![CDATA[${site.subtitle}]]></subtitle>` : ''}${
  favicon ? `\n  <icon>${favicon.src}</icon>` : ''
}
  <link href="${site.protocol + site.domain}" />
  <link href="${site.protocol + site.domain}/atom.xml" rel="self" type="application/atom+xml" />${
  feed.hubs?.map(hub => `\n  <link href="${hub}" rel="hub"/>`).join('') ?? ''
}
  <updated>${new Date().toJSON()}</updated>
  <author>
    <name><![CDATA[${site.author.name}]]></name>
  </author>${genTags(posts)
    .map(tag => `\n  <category term="${tag}" scheme="${site.protocol + site.domain}/?tags=${encodeURI(tag)}" />`)
    .join('')}${posts
  .map(
    post => `\n  <entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${site.protocol + site.domain + post.path}" />
    <id>${site.protocol + site.domain + post.path}</id>
    <published>${new Date(post.published ?? post.created).toJSON()}</published>
    <updated>${new Date(post.updated ?? post.published ?? post.created).toJSON()}</updated>${
  post.summary ? `\n    <summary type="html"><![CDATA[${post.summary.toString()}]]></summary>` : ''
}
    <content type="html">
      <![CDATA[${post.html}]]>
    </content>${post.tags
    ?.map(tag => `\n    <category term="${tag}" scheme="${site.protocol + site.domain}/?tags=${encodeURI(tag)}" />`)
    .join('')}
  </entry>`,
  )
  .join('')}
</feed>`.trim()

export const prerender = true
export const trailingSlash = 'never'
export const GET: RequestHandler = async () =>
  new Response(render(), {
    headers: {
      'content-type': 'application/atom+xml; charset=utf-8',
    },
  })
