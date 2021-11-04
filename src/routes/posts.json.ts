import type { EndpointOutput } from '@sveltejs/kit'
import { genPosts } from '$lib/utils/posts'

const posts = genPosts()
export const get = (): EndpointOutput => ({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(posts, null, 2)
})
