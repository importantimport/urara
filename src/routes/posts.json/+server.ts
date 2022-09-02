import type { RequestHandler } from './$types'
import { genPosts } from '$lib/utils/posts'

export const prerender = true
export const GET: RequestHandler = async () =>
  new Response(JSON.stringify(genPosts(), null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  })
