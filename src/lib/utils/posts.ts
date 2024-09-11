import type { FFFFlavoredFrontmatter } from 'fff-flavored-frontmatter'

interface GenPostsOptions {
  /** hide posts with 'unlisted' flag */
  filterUnlisted?: boolean
  /** import.meta.glob<Urara.Post.Module> https://vitejs.dev/guide/features.html#glob-import */
  modules?: { [path: string]: Urara.Post.Module }
  /** set to true to output html */
  postHtml?: boolean
  /** limit a certain number of posts */
  postLimit?: number
}

type GenPostsFunction = (options?: GenPostsOptions) => Urara.Post[]

type GenTagsFunction = (posts: Urara.Post[]) => string[]

/**
 * Detect Post Type
 * @param fm - post frontmatter
 * @returns - post type string
 */
export const typeOfPost = (
  fm: FFFFlavoredFrontmatter,
): 'article' | 'audio' | 'bookmark' | 'like' | 'note' | 'photo' | 'reply' | 'repost' | 'video' =>
  fm.title
    ? 'article'
    : fm.image
      ? 'photo'
      : fm.audio
        ? 'audio'
        : fm.video
          ? 'video'
          : fm.bookmark_of
            ? 'bookmark'
            : fm.like_of
              ? 'like'
              : fm.repost_of
                ? 'repost'
                : fm.in_reply_to
                  ? 'reply'
                  : 'note'

/**
 * Generate Posts List
 * @param options - An optional configuration object
 * @returns - posts list
 */
export const genPosts: GenPostsFunction = ({
  filterUnlisted = false,
  modules = import.meta.glob<Urara.Post.Module>('/src/routes/**/*.{md,svelte.md}', { eager: true }),
  postHtml = false,
  postLimit = undefined,
} = {}) =>
  Object.entries(modules)
    .map(([, module]) => ({
      ...module.metadata,
      html:
        postHtml || typeOfPost(module.metadata) !== 'article'
          ? module.default
            .render()
            .html // eslint-disable-next-line no-control-regex
            .replace(/[\u0000-\u001F]/g, '')
            .replace(/[\r\n]/g, '')
            .match(/<main [^>]+>(.*?)<\/main>/gi)?.[0]
            .replace(/<main [^>]+>(.*?)<\/main>/gi, '$1')
          // .replace(/( class=")(.*?)(")/gi, '')
            .replace(/( style=")(.*?)(")/gi, '')
            .replace(/(<span>)(.*?)(<\/span>)/gi, '$2')
            .replace(/(<main>)(.*?)(<\/main>)/gi, '$2')
          : '',
      type: typeOfPost(module.metadata),
    }))
    .filter((post, index) => (!filterUnlisted || !post.flags?.includes('unlisted')) && (!postLimit || index < postLimit))
    .sort((a, b) => Date.parse(b.published ?? b.created) - Date.parse(a.published ?? a.created))

/**
 * Generate Tags List
 * @param posts - posts list
 * @returns - tags list
 */
export const genTags: GenTagsFunction = posts => [
  ...new Set(posts.reduce((acc, posts) => (posts.tags ? [...acc, ...posts.tags] : acc), ['']).slice(1)),
]
