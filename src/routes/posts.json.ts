import type { EndpointOutput } from '@sveltejs/kit'
import { genPosts } from '$lib/utils/posts'

export const get = async (): Promise<EndpointOutput> => ({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(await genPosts(), null, 2)
})
