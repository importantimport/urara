interface GenPostsOptions {
  /** import.meta.globEager<Urara.PostModule> https://vitejs.dev/guide/features.html#glob-import */
  modules?: { [path: string]: Urara.PostModule }
  /** set to true to output html */
  postHtml?: boolean
}

type GenPostsFunction = (options?: GenPostsOptions) => { [priority: number]: Urara.Post[] }

/**
 * Generate Posts List
 * @param options - An optional configuration object
 * @returns - posts list with priority
 */
export const genPosts: GenPostsFunction = ({
  modules = import.meta.globEager<Urara.PostModule>('/src/routes/**/*.{md,svelte.md}'),
  postHtml = false
} = {}) =>
  Object.fromEntries(
    (
      Object.entries(
        Object.entries(modules)
          .map(([_path, module]) => [
            module.metadata?.priority?.[1] ?? module.metadata?.priority ?? 500,
            {
              ...module.metadata,
              html: postHtml
                ? module.default
                    .render()
                    .html // eslint-disable-next-line no-control-regex
                    .replace(/[\u0000-\u001F]/g, '')
                    .replace(/[\r\n]/g, '')
                    .match(/<main [^>]+>(.*?)<\/main>/gi)[0]
                    .replace(/( class=")(.*?)(")/gi, '')
                    .replace(/( style=")(.*?)(")/gi, '')
                    .replace(/(<span>)(.*?)(<\/span>)/gi, '$2')
                    .replace(/(<main>)(.*?)(<\/main>)/gi, '$2')
                : ''
            }
          ])
          .reduce((acc, [priority, post]) => ({ ...acc, [priority]: [...(acc[priority] ?? []), post] }), {})
      ) as [string, Urara.Post[]][]
    )
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([priority, posts]) => [
        priority,
        posts.sort((a, b) => (b.date ?? '1989-06-04').localeCompare(a.date ?? '1989-06-04'))
      ])
  )

/**
 * Generate Tags List
 * @param posts - flatten posts list
 * @returns - tags list with count
 */
export const genTags = (posts: Urara.Post[]): { [tag: string]: number } => {
  const tags: { [tag: string]: number } = {}
  posts.forEach(post =>
    post.tags?.forEach(tag => {
      if (!tags[tag]) tags[tag] = 0
      tags[tag] += 1
    })
  )
  return Object.fromEntries(Object.entries(tags).sort(([, a], [, b]) => a - b))
}
