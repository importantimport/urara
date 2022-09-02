import type { RequestHandler } from './$types'
import { genPosts, genTags } from '$lib/utils/posts'

export const prerender = true
export const GET: RequestHandler = async () =>
  new Response(JSON.stringify(genTags(genPosts()), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
