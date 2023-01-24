import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { feed } from '$lib/config/general'
import { favicon, any } from '$lib/config/icon'
import { genPosts } from '$lib/utils/posts'

const render = (posts = genPosts({ postHtml: true, postLimit: feed.limit, filterUnlisted: true })) => ({
  version: 'https://jsonfeed.org/version/1.1',
  title: site.title,
  home_page_url: site.protocol + site.domain,
  feed_url: site.protocol + site.domain + '/feed.json',
  description: site.description,
  icon: any['512'].src ?? any['192'].src,
  favicon: favicon?.src,
  authors: [
    {
      name: site.author.name,
      url: site.protocol + site.domain,
      avatar: site.author.avatar
    }
  ],
  language: site.lang ?? 'en',
  hubs: feed.hubs?.map(hub => ({
    type: 'WebSub',
    url: hub
  })),
  items: posts.map(post => ({
    id: post.path.slice(1),
    url: site.protocol + site.domain + post.path,
    title: post.title,
    content_html: post.html,
    summary: post['summary'],
    image: post['image'],
    date_published: post.published ?? post.created,
    date_modified: post.updated ?? post.published ?? post.created,
    tags: post.tags,
    _indieweb: {
      type: post.type,
      'in-reply-to': post.in_reply_to
    }
  }))
})

export const prerender = true
export const trailingSlash = 'never'
export const GET: RequestHandler = async () =>
  json(render(), {
    headers: {
      'content-type': 'application/feed+json; charset=utf-8'
    }
  })
