import type { RequestHandler } from '@sveltejs/kit'
import { genPosts, genTags } from '$lib/utils/posts'

export const get: RequestHandler = async () => ({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(genTags(genPosts()), null, 2)
})
