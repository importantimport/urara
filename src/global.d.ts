/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
  URARA_SITE_URL?: string
  URARA_IMG_PREFIX?: string
}

interface ImportMeta {
  env: ImportMetaEnv // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globEager<Module = { [key: string]: any }>(pattern: string): Record<string, Module>
}

declare namespace Urara {
  interface PostMetadata extends Record<string, unknown> {
    title?: string
    date?: string
    lastmod?: string
    descr?: string
    tags?: string[]
    priority?: number | [string, number]
    cover?: string | [string, string]
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
