interface GenPostsOptions {
  /** import.meta.globEager<Urara.Post.Module> https://vitejs.dev/guide/features.html#glob-import */
  modules?: { [path: string]: Urara.Post.Module }
  /** set to true to output html */
  postHtml?: boolean
  /** limit a certain number of posts */
  postLimit?: number
  /** hide posts with 'unlisted' flag */
  filterUnlisted?: boolean
}

type GenPostsFunction = (options?: GenPostsOptions) => Urara.Post[]

type GenTagsFunction = (posts: Urara.Post[]) => string[]

/**
 * Generate Posts List
 * @param options - An optional configuration object
 * @returns - posts list
 */
export const genPosts: GenPostsFunction = ({
  modules = import.meta.globEager<Urara.Post.Module>('/src/routes/**/*.{md,svelte.md}'),
  postHtml = false,
  postLimit = undefined,
  filterUnlisted = false
} = {}) =>
  Object.entries(modules)
    .map(([, module]) => ({
      ...module.metadata,
      html:
        postHtml || ['note', 'reply'].includes(module.metadata?.layout)
          ? module.default
              .render()
              .html // eslint-disable-next-line no-control-regex
              .replace(/[\u0000-\u001F]/g, '')
              .replace(/[\r\n]/g, '')
              .match(/<main [^>]+>(.*?)<\/main>/gi)[0]
              // .replace(/( class=")(.*?)(")/gi, '')
              .replace(/( style=")(.*?)(")/gi, '')
              .replace(/(<span>)(.*?)(<\/span>)/gi, '$2')
              .replace(/(<main>)(.*?)(<\/main>)/gi, '$2')
          : ''
    }))
    .filter((post, index) => (!filterUnlisted || !post.flags?.includes('unlisted')) && (!postLimit || index < postLimit))
    .sort((a: Urara.Post, b: Urara.Post) => Date.parse(b.published ?? b.created) - Date.parse(a.published ?? a.created))

/**
 * Generate Tags List
 * @param posts - posts list
 * @returns - tags list
 */
export const genTags: GenTagsFunction = posts => [
  ...new Set(posts.reduce((acc, posts) => (posts.tags ? [...acc, ...posts.tags] : acc), ['']).slice(1))
]
