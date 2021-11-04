/**
 * Generate Tags List
 * @param posts flatten posts list
 * @returns tags list with count
 */
export const genTags = (posts: Urara.Post[]): Record<string, number> => {
  const tags: Record<string, number> = {}
  posts.forEach(post =>
    post.tags
      ? post.tags.forEach(tag => {
          if (!tags[tag]) tags[tag] = 0
          tags[tag] += 1
        })
      : ''
  )
  return Object.fromEntries(Object.entries(tags).sort(([, a], [, b]) => a - b))
}
