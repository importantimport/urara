/**
 * Generate Posts List
 * @param modules import.meta.globEager https://vitejs.dev/guide/features.html#glob-import
 * @returns Promise<{ [priority: number]: Urara.Post[] }>
 */
export const genPosts = async (
  modules: { [path: string]: Urara.PostModule } = import.meta.globEager<Urara.PostModule>(
    '/src/routes/**/index.{md,svelte.md,svx}'
  )
): Promise<{ [priority: number]: Urara.Post[] }> =>
  Object.fromEntries(
    (
      Object.entries(
        Object.entries(modules)
          .map(([path, module]) => [
            module.metadata?.priority?.[1] ?? module.metadata?.priority ?? 500,
            {
              slug: path,
              path: path.slice(11).replace(/\/index.md|\/index.svelte.md|\/index.svx/, ''),
              html: import.meta.env.PROD
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
                : '',
              ...module.metadata
            }
          ])
          .reduce((acc, [priority, post]) => ({ ...acc, [priority]: [...(acc[priority] ?? []), post] }), {})
      ) as [string, Urara.Post[]][]
    ).map(([priority, posts]) => [
      priority,
      posts.sort((a, b) => (b.date ?? '1989-06-04').localeCompare(a.date ?? '1989-06-04'))
    ])
  )
