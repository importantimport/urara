/**
 * Generate Posts List
 * @returns posts list with priority
 */
export const genPosts = (): Record<number, Urara.Post[]> => {
  let posts: Record<number, Urara.Post[]> = { 500: [] }
  Object.entries(import.meta.globEager<Urara.PostModule>('/src/routes/**/index.{md,svelte.md,svx}'))
    .map(([postpath, module]) => ({
      slug: postpath,
      path: postpath.slice(11).replace(/\/index.md|\/index.svelte.md|\/index.svx/g, ''),
      html: module.default
        .render()
        .html // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u001F]/g, '')
        .replace(/[\r\n]/g, '')
        .match(/<main [^>]+>(.*?)<\/main>/gi)[0]
        .replace(/( class=")(.*?)(")/gi, '')
        .replace(/( style=")(.*?)(")/gi, '')
        .replace(/(<span>)(.*?)(<\/span>)/gi, '$2')
        .replace(/(<main>)(.*?)(<\/main>)/gi, '$2'),
      ...module?.metadata
    }))
    .sort((a, b) => (b.date ?? '1989-06-04').localeCompare(a.date ?? '1989-06-04'))
    .forEach(post => {
      post.priority === undefined
        ? posts[500].push(post)
        : Array.isArray(post.priority)
        ? posts[post.priority[1]]
          ? posts[post.priority[1]].push(post)
          : (() => {
              posts[post.priority[1]] = []
              posts[post.priority[1]].push(post)
            })()
        : posts[post.priority]
        ? posts[post.priority].push(post)
        : (() => {
            posts[post.priority] = []
            posts[post.priority].push(post)
          })()
    })
  return posts
}
