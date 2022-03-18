import type { Handle } from '@sveltejs/kit'
import { site } from '$lib/config/site'

export const handle: Handle = async ({ event, resolve }) =>
  await resolve(event, {
    transformPage: ({ html }) => (site.lang ? html.replace('<html lang="en">', `<html lang="${site.lang}">`) : html)
  })
