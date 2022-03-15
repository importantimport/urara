import type { RequestHandlerOutput } from '@sveltejs/kit'
import { genPosts } from '$lib/utils/posts'

export const get = async (): Promise<RequestHandlerOutput> => ({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(genPosts(), null, 2)
})
