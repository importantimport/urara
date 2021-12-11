/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
  URARA_SITE_URL?: string
  URARA_IMG_PREFIX?: string
}

interface ImportMeta {
  env: ImportMetaEnv
  globEager<Module = { [key: string]: unknown }>(pattern: string): Record<string, Module>
}

declare namespace Urara {
  interface PostToc {
    depth?: number
    title?: string
    slug?: string
    children?: PostToc[]
  }
  interface PostMetadata extends Record<string, unknown> {
    title?: string
    date?: string
    lastmod?: string
    descr?: string
    tags?: string[]
    priority?: number | [string, number]
    cover?: string | [string, string]
    toc?: boolean | PostToc[]
  }
  interface PostModule {
    default: { render: () => { html: string; head: string; css: { code: string } } }
    metadata: PostMetadata
  }
  interface Post extends PostMetadata {
    slug?: string
    path?: string
    html?: string
  }
}
