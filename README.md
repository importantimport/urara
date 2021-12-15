<br>
<div align="center">
<a href="https://github.com/importantimport/urara">
<img src="https://github.com/importantimport/urara/raw/main/urara/assets/any@512.png" alt="urara" width="192px" />
</a>
</div>
<br>

<h1 align="center">Urara [β]</h1>
<p align="center">Sweet & Powerful SvelteKit Blog Template.</p>
<p align="center">
<img src="https://img.shields.io/github/languages/top/importantimport/urara?color=%23ff3e00" alt="Language">
<a href="https://github.com/importantimport/urara/blob/main/COPYING"><img src="https://img.shields.io/github/license/importantimport/urara?color=%23fff" alt="License"></a>
<img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimportantimport%2Furara.svg?type=shield" alt="FOSSA Status">
</p>
<p align="center">
<a href="https://urara-demo.netlify.app">Demo</a>
/
<a href="https://github.com/importantimport/urara/discussions">Discussions</a>
</p>

## 🎉 Try it now!

### GitHub

[Use this template](https://github.com/importantimport/urara/generate)

### Local

```bash
npx degit importantimport/urara [blog-name]
```

## ⚡️ Usage

### Development

This template recommends using [pnpm](https://pnpm.io) and [@antfu/ni](https://github.com/antfu/ni). start a development server:

```bash
# http://localhost:3000
nr dev
```

or listen to different IP and port:

```bash
# http://0.0.0.0:3000
nr dev --host 0.0.0.0

# http://0.0.0.0:8080
nr dev --host 0.0.0.0 --port 8080
```

### Build

```bash
nr build
```

or use the specified adapter:

```bash
# Vercel
VERCEL=true nr build

# Cloudflare Pages
CF_PAGES=true nr build

# Netlify
NETLIFY=true nr build
```

> This template uses `@sveltejs/adapter-auto@next` and `@sveltejs/adapter-static@next` by default.

> when the environment supported by adapter-auto is not detected, it will automatically fallback to adapter-static.

> u can modify it to any adapter supported by SvelteKit. see [SvelteKit Docs](https://kit.svelte.dev/docs#adapters)

> u can preview the built app with `nr preview`, regardless of
> whether u installed an adapter. This should _not_ be used to serve
> ur app in production.

## ✨ Sites

- [./kwaa.dev](https://kwaa.dev)

and more...

- [urara-blog - Discussions](https://github.com/importantimport/urara/discussions/2)
- [urara-blog - Topics](https://github.com/topics/urara-blog)

are u using Urara? add the `urara-blog` topic on ur repo!

## 📝 License

This work is free, it comes without any warranty. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimportantimport%2Furara.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimportantimport%2Furara?ref=badge_large)

special thanks / inspired from:

- [@michaeloliverx - Generate Posts List](https://github.com/pngwn/MDsveX/issues/294#issuecomment-907029639)
- [@jthegedus - Build Mode](https://github.com/sveltejs/kit/issues/1258#issuecomment-874482104)
- [@FunMiles - Service Worker](https://github.com/FunMiles/SveltekitPWA/blob/main/src/service-worker.ts)

credits:

- icons made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com)
