/**
 * Generate Tags List
 * @param posts flatten posts list
 * @returns tags list with count
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
