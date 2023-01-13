<br />
<div align="center">
<a href="https://github.com/importantimport/urara">
<img src="https://github.com/importantimport/urara/raw/main/urara/hello-world/urara.webp" alt="urara" /></a>
</div>
<br />

<p align="center">
<a href="https://fff.js.org"><img src="https://img.shields.io/badge/%F0%9F%8C%9F%20F%20F%20F-0.5-yellow?style=flat" alt="fff" /></a>
<img src="https://img.shields.io/github/languages/top/importantimport/urara?color=%23ff3e00" alt="Language" />
<a href="https://github.com/importantimport/urara/blob/main/COPYING"><img src="https://img.shields.io/github/license/importantimport/urara?color=%23fff" alt="License" /></a>
<img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimportantimport%2Furara.svg?type=shield" alt="FOSSA Status" />
</p>
<p align="center">
<a href="https://urara-demo.netlify.app">🚀 演示</a>
/
<a href="https://urara-docs.netlify.app">📝 文檔</a>
/
<a href="https://github.com/importantimport/urara/discussions">💬 討論</a>
</p>
<p align="center">
<a href="https://github.com/importantimport/urara">English</a>
|
<span>正體中文</span>
</p>

## 🎉 現在就試試！

### 本地

```bash
npx degit importantimport/urara my-blog && cd my-blog # 在當前目錄創建一個名為 my-blog 的新項目
pnpm i # 如果你沒有安裝 pnpm，運行：npm i -g pnpm
```

### 遠端

[![Open in StackBlitz](https://img.shields.io/badge/-Open%20in%20StackBlitz-1374ef?style=for-the-badge&logo=Amp)](https://stackblitz.com/github/importantimport/urara) [![Use this template](https://img.shields.io/badge/-Use%20this%20Template-181717?style=for-the-badge&logo=GitHub)](https://github.com/importantimport/urara/generate) [![Deploy with Vercel](https://img.shields.io/badge/-Deploy%20with%20Vercel-1374ef?style=for-the-badge&logo=Vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimportantimport%2Furara&env=URARA_SITE_URL&envDescription=Site%20URL.&envLink=https%3A%2F%2Fexample.com&project-name=urara-blog&repository-name=urara-blog) [![Deploy to Netlify](https://img.shields.io/badge/-Deploy%20to%20Netlify-15847d?style=for-the-badge&logo=Netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fimportantimport%2Furara#URARA_SITE_URL=https://example.com&CUSTOM_LOGO=https://github.com/importantimport/urara/raw/main/urara/assets/any@512.png)

## ⚡️ 用法

### 開發

啟動開發服務器：

```bash
pnpm dev
```

### 構建

創建你的博客的產品版本：

```bash
pnpm build
```

你還可以使用 `pnpm preview` 預覽構建的網站。

### 文檔

如需完整文檔，請訪問 [urara-docs.netlify.app](https://urara-docs.netlify.app)。

### 給這個項目一個 star

非常感謝！你的 ⭐ 會給我更多的動力來改進這個項目。

## ✨ 特徵

- 開箱即用的 **Atom feed** (WebSub), **Sitemap**, **PWA** (Web app manifest & ServiceWorker) 支持。
- 使用 daisyUI 呈現精美的界面設計和動畫效果，當然。
- 良好的 [IndieWeb](https://indieweb.org/) 兼容性 - 帶有 [microformats2](https://microformats.org/) 標記內容的多種帖子，通過 [webmentions.io](https://webmentions.io) API 展示 [Webmentions](https://indieweb.org/Webmention)。
- 不用擔心文章和圖像目錄 - 只需將它們放在一個文件夾下，它們就會[在構建時自動複製](https://github.com/importantimport/urara/blob/main/urara.ts)。
- [評論組件](https://github.com/importantimport/urara/tree/main/src/lib/components/comments)： Webmentions、 Giscus、 Utterances... 你可以使用不止一個。

## 📦️ 預捆綁

### TailwindCSS & PostCSS 插件

- [daisyUI](https://github.com/saadeghi/daisyui) - The most popular, free and open-source Tailwind CSS component library.
- [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography) - Beautiful typographic defaults for HTML you don't control.
- [Autoprefixer](https://github.com/postcss/autoprefixer) - Parse CSS and add vendor prefixes to rules by Can I Use.
- [CSSNANO](https://github.com/cssnano/cssnano) - A modular minifier, built on top of the PostCSS ecosystem.

### Markdown 預處理器和語法高亮

- [MDsveX](https://github.com/pngwn/MDsveX) - A markdown preprocessor for Svelte.
- [Shiki Twoslash](https://github.com/shikijs/twoslash) - A beautiful Syntax Highlighter.

### Vite 插件

- [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand atomic CSS engine.
- [VitePWA](https://github.com/antfu/vite-plugin-pwa) - Zero-config PWA for Vite.

## 🚀 網站

- [./kwaa.dev](https://kwaa.dev) - [kwaa/blog](https://github.com/kwaa/blog)
- [Seviche.cc](https://seviche.cc) - [Sevichecc/Urara-Blog](https://github.com/Sevichecc/Urara-Blog)
- [Antonio Sarcevic](https://www.sarcevic.dev) - [SarcevicAntonio/SarcevicAntonio](https://github.com/SarcevicAntonio/SarcevicAntonio)

和更多...

- [urara-blog - Discussions](https://github.com/importantimport/urara/discussions/2)
- [urara-blog - Topics](https://github.com/topics/urara-blog)

你在用 Urara 嗎？在你的 repo 上添加 `urara-blog` 主題！

## 👥 貢獻

如果您有興趣為 Urara 做出貢獻，請在提交拉取請求之前閱讀[貢獻文檔](.github/CONTRIBUTING.md)。

## 📝 License

這項工作是免費的，它沒有任何保證。你可以在以下條款下重新發布和/或修改它：

Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar.

有關詳細信息，請參閱 [COPYING](COPYING) 文件。

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimportantimport%2Furara.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimportantimport%2Furara?ref=badge_large)

特別感謝 / 靈感來自於：

- [@michaeloliverx - Generate Posts List](https://github.com/pngwn/MDsveX/issues/294#issuecomment-907029639)
- [Kpouri](https://github.com/kpouri) 製作的圖標
