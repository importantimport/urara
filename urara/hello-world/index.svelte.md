---
title: 'Hello World'
date: 2021-11-01
lastmod: 2021-12-12
tags:
  - 'Hello World'
  - 'Urara'
cover: '/hello-world/cover.webp'
---

Welcome to Urara! this article contains some basic operations to help you quickly get started.

to use the reduced commands, you need to install @antfu/ni.

## Developing

```bash
nr dev # http://localhost:3000
nr dev --open # http://localhost:3000 - open the app in a new browser tab
nr dev --host 0.0.0.0 # http://0.0.0.0:3000
nr dev --port 8080 # http://localhost:8080
```

## Building

This template uses `@sveltejs/adapter-static@next` by default, but u can use any adapter supported by SvelteKit. more on [SvelteKit Docs](https://kit.svelte.dev/docs#adapters)

```bash
MODE=production nr build
MODE=workers nr build # build for 'workers' mode
MODE=netlify nr build # build for 'netlify' mode
MODE=vercel nr build # build for 'vercel' mode
```

and create different configuration files to correspond to the corresponding mode:

```ini
# .env.workers
MODE=production
URARA_SITE_URL='https://example.workers.dev'
```

```js
// svelte.config.js
const config = {
  ...,
  kit: {
    adapter:
      process.env.MODE === 'workers'
        ? adapterWorkers()
        : process.env.MODE === 'vercel'
        ? adapterVercel()
        : process.env.MODE === 'netlify'
        ? adapterNetlify()
        : adapterStatic({
            pages: 'build',
            assets: 'build',
            fallback: null
          }),
    ...,
  }
}
```

> You can preview the built app with `nr preview`, regardless of
> whether you installed an adapter. This should _not_ be used to serve
> your app in production.

## Misc

```bash
nr clean # clean the files under /src/routes/**/ and /static/
nr check # code check
nr format # code prittier
nr lint # code lint
```
