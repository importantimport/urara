import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
export const posts: Writable<Urara.Post[]> = writable([])
export const tags: Writable<string[]> = writable([])
