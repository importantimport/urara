/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

interface ImportMetaEnv {
  [key: string]: string | boolean
}

interface ImportMeta {
  globEager<Module = { [key: string]: unknown }>(pattern: string): Record<string, Module>
}

declare namespace Urara {
  namespace Post {
    interface Article {
      layout: 'article'
      descr?: string
      cover?: string
      toc?: false | Article.Toc[]
    }
    namespace Article {
      interface Toc {
        depth?: number
        title?: string
        slug?: string
        children?: Toc[]
      }
    }
    interface Note {
      layout: 'note'
    }
    interface Photo {
      layout: 'photo'
      cover?: string
    }
    interface Reply {
      layout: 'reply'
      /** u-in-reply-to */
      replyTo?: string | string[]
    }
    interface Common {
      /** @deprecated - do not use */
      priority?: never
      /** prepare to transfer to `created` */
      date?: string
      /** prepare to transfer to `updated` */
      lastmod?: string

      title?: string
      published?: string
      created?: string
      updated?: string
      path?: string
      slug?: string
      tags?: string[]
      /** alternatives to `priority`. `'top'` */
      flags?: string[]
    }
    type Metadata = Common & (Article | Note | Photo | Reply)
    interface Module {
      default: { render: () => { html: string; head: string; css: { code: string } } }
      metadata: Metadata
    }
  }
  type Post = Post.Metadata & { html?: string }
  type Page = { title?: string; path: string }
}
