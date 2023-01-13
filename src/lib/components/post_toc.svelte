<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  export let toc: Urara.Post.Toc[]

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
    if (typeof articleObserver !== 'undefined') articleObserver.disconnect()
  })

  $: if (intersecting.length > 0) bordered = intersecting
  $: if (intersectingArticle === false) bordered = []
  $: if (bordered)
    toc.forEach(heading =>
      bordered.includes(heading.slug!)
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
    <ul dir="ltr" id="toc-list-root">
      {#each toc as { depth, title, slug }}
        <li id={`toc-item-${slug}`} class="flex flex-col">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            dir="ltr"
            on:click={() =>
              // @ts-ignore Object is possibly 'null'. ts(2531)
              document.getElementById(slug).scrollIntoView({ behavior: 'smooth' })}
            id={`toc-link-${slug}`}
            class="cursor-pointer border-l-4 border-transparent transition-all hover:border-primary hover:bg-base-content hover:bg-opacity-10 active:bg-primary active:text-primary-content active:font-bold pr-4 {depth <=
            2
              ? 'py-3'
              : 'py-2'}"
            class:pl-4={depth <= 2}
            class:pl-8={depth === 3}
            class:pl-12={depth === 4}
            class:pl-16={depth === 5}
            class:pl-20={depth === 6}>
            {title}
          </span>
        </li>
      {/each}
    </ul>
  </nav>
</aside>
