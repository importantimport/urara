import type { RequestHandler } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { feed } from '$lib/config/general'
import { icon } from '$lib/config/icon'
import { genPosts } from '$lib/utils/posts'

const render = async (posts = genPosts({ postHtml: true, postLimit: feed.limit, filterUnlisted: true })) => ({
  version: 'https://jsonfeed.org/version/1.1',
  title: site.title,
  home_page_url: site.protocol + site.domain,
  feed_url: site.protocol + site.domain + '/feed.json',
  description: site.description,
  icon: icon.any192.src,
  favicon: icon.favicon.src,
  authors: [
    {
      name: site.author.name,
      url: site.protocol + site.domain,
      avatar: site.author.photo
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
    image: post['photo'],
    date_published: post.published ?? post.created,
    date_modified: post.updated ?? post.published ?? post.created,
    tags: post.tags,
    _indieweb: {
      type: post.layout ?? 'article'
    }
  }))
})

export const get: RequestHandler = async () => ({
  headers: {
    'Content-Type': 'application/feed+json; charset=utf-8'
  },
  body: JSON.stringify(await render(), null, 2)
})
