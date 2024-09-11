/// <reference types="@sveltejs/kit" />

import type { FFFBase, FFFMedia, FFFMention } from 'fff-flavored-frontmatter'

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly URARA_SITE_DOMAIN?: string
  readonly URARA_SITE_PROTOCOL?: 'http://' | 'https://'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  glob: <Module = { [key: string]: unknown }>(pattern: string) => Record<string, Module>
}

declare global {
  namespace Urara {
    namespace Post {
      type Frontmatter = {
        /**
         * the created date of the post.
         * @remarks auto-generated or set manually
         */
        created: string
        /**
         * enable some advanced features.
         * @property hidden - deprecated, transfer to `unlisted`
         * @property unlisted - hide this post from the homepage and feed.
         * @property bridgy-fed - add a link to Bridgy Fed in the post. https://fed.brid.gy/
         * @property bridgy-{target} - add a link to Bridgy in the post. https://brid.gy/publish/{target}
         */
        flags?: string[]
        /**
         * the featured image for article, or image for "photo" / "multi-photo" posts.
         * @remarks currently only supports string
         */
        image?: string
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
         * the published date of the post.
         */
        published?: string
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
         * post type.
         * @remarks auto-generated
         */
        type: 'article' | 'audio' | 'bookmark' | 'like' | 'note' | 'photo' | 'reply' | 'repost' | 'video'
        /**
         * the updated date of the post.
         * @remarks auto-generated or set manually
         */
        updated: string
      } &
      Omit<FFFBase, 'flags'> &
      Pick<FFFMedia, 'alt'> & Pick<FFFMention, 'in_reply_to'>
      interface Toc {
        children?: Toc[]
        depth: number
        slug?: string
        title?: string
      }
      interface Module {
        default: {
          render: () => {
            css: {
              code: string
            }
            head: string
            html: string
          }
        }
        metadata: Frontmatter
      }
    }
    type Post = { html?: string } & Post.Frontmatter
    interface Page { path: string, title?: string }
  }
}
