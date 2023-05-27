/// <reference types="@sveltejs/kit" />

import type { FFFBase, FFFMedia, FFFMention } from 'fff-flavored-frontmatter'

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly URARA_SITE_PROTOCOL?: 'http://' | 'https://'
  readonly URARA_SITE_DOMAIN?: string
}

interface ImportMeta {
  glob<Module = { [key: string]: unknown }>(pattern: string): Record<string, Module>
  readonly env: ImportMetaEnv
}

declare global {
  namespace Urara {
    namespace Post {
      type Frontmatter = Omit<FFFBase, 'flags'> &
        Pick<FFFMention, 'in_reply_to'> &
        Pick<FFFMedia, 'alt'> & {
          /**
           * post type.
           * @remarks auto-generated
           */
          type: 'article' | 'note' | 'photo' | 'reply' | 'audio' | 'video' | 'like' | 'repost' | 'bookmark'
          /**
           * post layout.
           */
          layout?: 'article' | 'note' | 'photo' | 'reply'
          /**
           * post path.
           * @remarks auto-generated
           */
          path: string
          /**
           * post slug.
           * @remarks auto-generated
           */
          slug: string
          /**
           * table of contents.
           * @remarks auto-generated, article-only, set to `false` to disable
           */
          toc?: false | Toc[]
          /**
           * the created date of the post.
           * @remarks auto-generated or set manually
           */
          created: string
          /**
           * the updated date of the post.
           * @remarks auto-generated or set manually
           */
          updated: string
          /**
           * the published date of the post.
           */
          published?: string
          /**
           * the featured image for article, or image for "photo" / "multi-photo" posts.
           * @remarks currently only supports string
           */
          image?: string
          /** enable some advanced features.
           * @property hidden - deprecated, transfer to `unlisted`
           * @property unlisted - hide this post from the homepage and feed.
           * @property bridgy-fed - add a link to Bridgy Fed in the post. https://fed.brid.gy/
           * @property bridgy-{target} - add a link to Bridgy in the post. https://brid.gy/publish/{target}
           */
          flags?: string[]
        }
      type Toc = {
        depth: number
        title?: string
        slug?: string
        children?: Toc[]
      }
      interface Module {
        default: {
          render: () => {
            html: string
            head: string
            css: {
              code: string
            }
          }
        }
        metadata: Frontmatter
      }
    }
    type Post = Post.Frontmatter & { html?: string }
    type Page = { title?: string; path: string }
  }
}
