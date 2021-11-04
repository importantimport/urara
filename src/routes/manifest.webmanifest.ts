import type { EndpointOutput } from '@sveltejs/kit'
import { manifest } from '$lib/config/manifest'
import { toSnake } from '$lib/utils/case'

export const get = (): EndpointOutput => ({
  headers: {
    'Content-Type': 'application/manifest+json; charset=utf-8'
  },
  body: JSON.stringify(toSnake(manifest), null, 4)
})
