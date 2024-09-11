import { genPosts, genTags } from '$lib/utils/posts'
import { json } from '@sveltejs/kit'

import type { RequestHandler } from './$types'

export const prerender = true
export const trailingSlash = 'never'
export const GET: RequestHandler = async () => json(genTags(genPosts()))
