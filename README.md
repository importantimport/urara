<br>
<div align="center">
<a href="https://github.com/importantimport/urara">
<img src="https://github.com/importantimport/urara/raw/main/urara/assets/any@512.png" alt="urara" width="192px" />
</a>
</div>
<br>

<h1 align="center">Urara [γ]</h1>
<p align="center">Sweet & Powerful SvelteKit Blog Starter.</p>
<p align="center">
<img src="https://img.shields.io/github/languages/top/importantimport/urara?color=%23ff3e00" alt="Language">
<a href="https://github.com/importantimport/urara/blob/main/COPYING"><img src="https://img.shields.io/github/license/importantimport/urara?color=%23fff" alt="License"></a>
<img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimportantimport%2Furara.svg?type=shield" alt="FOSSA Status">
</p>
<p align="center">
<a href="https://urara-demo.netlify.app">🚀 Demo</a>
/
<a href="https://urara-docs.netlify.app">📝 Documentation</a>
/
<a href="https://github.com/importantimport/urara/discussions">💬 Discussions</a>
</p>

## 🎉 Try it now!

### Local

```bash
npx degit importantimport/urara my-blog && cd my-blog # create a new project in my-blog
pnpm i # if u don't have pnpm installed, run: npm i -g pnpm
```

### Remote

[![Use this template](https://img.shields.io/badge/-Use%20this%20Template-181717?style=for-the-badge&logo=GitHub)](https://github.com/importantimport/urara/generate) [![Deploy with Vercel](https://img.shields.io/badge/-Deploy%20with%20Vercel-1374ef?style=for-the-badge&logo=Vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimportantimport%2Furara&env=URARA_SITE_URL&envDescription=Site%20URL.&envLink=https%3A%2F%2Fexample.com&project-name=urara-blog&repository-name=urara-blog) [![Deploy to Netlify](https://img.shields.io/badge/-Deploy%20to%20Netlify-15847d?style=for-the-badge&logo=Netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fimportantimport%2Furara#URARA_SITE_URL=https://example.com&CUSTOM_LOGO=https://github.com/importantimport/urara/raw/main/urara/assets/any@512.png)

## ⚡️ Usage

### Developing

Start a development server:

```bash
pnpm dev
```

### Building

Create a production version of ur blog:

```bash
pnpm build
```

u can preview the built app with `pnpm preview`.

### Documentation

For full documentation, visit [urara-docs.netlify.app](https://urara-docs.netlify.app).

### Give this project a star

tyvm! ur ⭐ will give me more motivation to improve this project.

## ✨ Features

- Out of the box **Atom feed** (WebSub), **Sitemap**, **PWA** (Web app manifest & ServiceWorker) support.
- Present beautiful interface designs and animations with daisyUI, of course.
- Good [IndieWeb](https://indieweb.org/) Compatibility - Multi-kind posts with [microformats2](https://microformats.org/) markup content, Showcasing [Webmentions](https://webmention.org/) via [webmentions.io](https://webmentions.io) API
- Don't worry about the article and image directories - just put them under a folder and they'll be [copied automatically at build time](https://github.com/importantimport/urara/blob/main/urara.js).
- [Comment Components](https://github.com/importantimport/urara/tree/main/src/lib/components/comments): Webmentions, Giscus, Utterances... u can use more than one.

## 📦️ Pre-packed

### TailwindCSS & PostCSS Plugins

- [daisyUI](https://github.com/saadeghi/daisyui) - The most popular, free and open-source Tailwind CSS component library
- [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography) - Beautiful typographic defaults for HTML you don't control.
- [Autoprefixer](https://github.com/postcss/autoprefixer) - Parse CSS and add vendor prefixes to rules by Can I Use
- [CSSNANO](https://github.com/cssnano/cssnano) - A modular minifier, built on top of the PostCSS ecosystem.

### Markdown preprocessor & Syntax highlighter

- [MDsveX](https://github.com/pngwn/MDsveX) - A markdown preprocessor for Svelte.
- [Shiki Twoslash](https://github.com/shikijs/twoslash) - A beautiful Syntax Highlighter.

### Vite Plugins

- [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand atomic CSS engine.

## 🚀 Sites

- [./kwaa.dev](https://kwaa.dev)
- [成功他媽．阿瑋](https://kwchang0831.dev)

and more...

- [urara-blog - Discussions](https://github.com/importantimport/urara/discussions/2)
- [urara-blog - Topics](https://github.com/topics/urara-blog)

are u using Urara? add the `urara-blog` topic on ur repo!

## 👥 Contributing

If u're interested in contributing to Urara, pls read [contributing docs](.github/CONTRIBUTING.md) before submitting a pull request.

## 📝 License

This work is free, it comes without any warranty. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the [COPYING](https://github.com/importantimport/urara/blob/main/COPYING) file for more details.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimportantimport%2Furara.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimportantimport%2Furara?ref=badge_large)

special thanks / inspired from:

- [@michaeloliverx - Generate Posts List](https://github.com/pngwn/MDsveX/issues/294#issuecomment-907029639)
- [@jthegedus - Build Mode](https://github.com/sveltejs/kit/issues/1258#issuecomment-874482104)
- [@FunMiles - Service Worker](https://github.com/FunMiles/SveltekitPWA/blob/main/src/service-worker.ts)

credits:

- icon made by [Kpouri](https://github.com/kpouri)
