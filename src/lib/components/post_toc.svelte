<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Tree from '$lib/components/post_toc_tree.svelte'
  export let toc: Urara.Post.Article.Toc[]

  let intersecting: string[] = []
  let intersectingArticle: boolean = true
  let bordered: string[] = []

  onMount(() => {
    if (window.screen.availWidth >= 1280) {
      const headingsObserver = new IntersectionObserver(
        headings =>
          headings.forEach(heading =>
            heading.isIntersecting
              ? intersecting.push(heading.target.id)
              : (intersecting = intersecting.filter(h => h !== heading.target.id))
          ),
        { rootMargin: '-64px 0px 0px 0px' }
      )
      const articleObserver = new IntersectionObserver(article => (intersectingArticle = article[0].isIntersecting))
      Array.from(document.querySelectorAll('main h2, main h3, main h4, main h5, main h6')).forEach(element =>
        headingsObserver.observe(element)
      )
      articleObserver.observe(document.getElementsByTagName('main')[0])
    }
  })

  onDestroy(() => {
    // @ts-ignore: Cannot find name 'headingsObserver'
    if (typeof headingsObserver !== 'undefined') headingsObserver.disconnect()
    // @ts-ignore: Cannot find name 'articleObserver'
    if (typeof headingsObserver !== 'undefined') articleObserver.disconnect()
  })

  $: if (intersecting.length > 0) bordered = intersecting
  $: if (intersectingArticle === false) bordered = []
  $: if (bordered)
    toc.forEach(heading =>
      bordered.includes(heading.slug)
        ? document.getElementById(`toc-link-${heading.slug}`)?.classList.add('!border-accent')
        : document.getElementById(`toc-link-${heading.slug}`)?.classList.remove('!border-accent')
    )
</script>

<aside class="sticky top-16 py-8">
  <nav
    id="post-toc"
    aria-label="TableOfContent"
    dir="rtl"
    class="max-h-[calc(100vh-12rem)] overflow-y-hidden hover:overflow-y-auto">
    <Tree
      toc={toc.reduce(
        (acc, heading) => {
          let parent = acc
          while (parent.depth + 1 < heading.depth) parent = parent.children.at(-1)
          parent.children = [...(parent.children ?? []), { ...heading, children: [] }]
          return acc
        },
        { depth: toc[0].depth - 1, children: [] }
      )} />
  </nav>
</aside>
