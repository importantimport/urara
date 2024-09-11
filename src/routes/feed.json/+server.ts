import { feed } from '$lib/config/general'
import { any, favicon } from '$lib/config/icon'
import { site } from '$lib/config/site'
import { genPosts } from '$lib/utils/posts'
import { json } from '@sveltejs/kit'

import type { RequestHandler } from './$types'

const render = (posts = genPosts({ filterUnlisted: true, postHtml: true, postLimit: feed.limit })) => ({
  authors: [
    {
      avatar: site.author.avatar,
      name: site.author.name,
      url: site.protocol + site.domain,
    },
  ],
  description: site.description,
  favicon: favicon?.src,
  feed_url: `${site.protocol + site.domain}/feed.json`,
  home_page_url: site.protocol + site.domain,
  hubs: feed.hubs?.map(hub => ({
    type: 'WebSub',
    url: hub,
  })),
  icon: any['512'].src ?? any['192'].src,
  items: posts.map(post => ({
    _indieweb: {
      'in-reply-to': post.in_reply_to,
      'type': post.type,
    },
    content_html: post.html,
    date_modified: post.updated ?? post.published ?? post.created,
    date_published: post.published ?? post.created,
    id: post.path.slice(1),
    image: post.image,
    summary: post.summary,
    tags: post.tags,
    title: post.title,
    url: site.protocol + site.domain + post.path,
  })),
  language: site.lang ?? 'en',
  title: site.title,
  version: 'https://jsonfeed.org/version/1.1',
})

export const prerender = true
export const trailingSlash = 'never'
export const GET: RequestHandler = async () =>
  json(render(), {
    headers: {
      'content-type': 'application/feed+json; charset=utf-8',
    },
  })
