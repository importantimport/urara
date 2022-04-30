import type { Handle } from '@sveltejs/kit'
import { site } from '$lib/config/site'

export const handle: Handle = async ({ event, resolve }) =>
  await resolve(event, {
    transformPage: ({ html }) => html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
  })
