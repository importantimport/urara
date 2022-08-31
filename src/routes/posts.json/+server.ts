import type { RequestHandler } from '@sveltejs/kit'
import { genPosts } from '$lib/utils/posts'

export const GET: RequestHandler = async () => new Response(JSON.stringify(genPosts(), null, 2), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
