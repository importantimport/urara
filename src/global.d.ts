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
      /** @deprecated - transfer to `created` */
      date?: string
      /** @deprecated - transfer to `updated` */
      lastmod?: string
      /** created time */
      created?: string
      /** updated time */
      updated?: string
      /** published time */
      published?: string
      title?: string
      path?: string
      slug?: string
      tags?: string[]
      /** enable some advanced features.
       * @property hidden = hide this post from the homepage and Atom feed.
       * @property bridgy-fed - add a link to Bridgy Fed in the post. https://fed.brid.gy/
       * @property bridgy-{target} - add a link to Bridgy in the post. https://brid.gy/publish/{target}
       */
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
