import type { RequestHandler } from '@sveltejs/kit'
import { genPosts, genTags } from '$lib/utils/posts'

export const GET: RequestHandler = async () => ({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(genTags(genPosts()), null, 2)
})
