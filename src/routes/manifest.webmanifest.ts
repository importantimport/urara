import type { RequestHandlerOutput } from '@sveltejs/kit'
import { manifest } from '$lib/config/manifest'
import { toSnake } from '$lib/utils/case'

export const get = (): RequestHandlerOutput => ({
  headers: {
    'Content-Type': 'application/manifest+json; charset=utf-8'
  },
  body: JSON.stringify(Object.fromEntries(Object.entries(manifest).map(([k, v]) => [toSnake(k), v])), null, 4)
})
