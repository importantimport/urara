<script lang="ts" context="module">
  import img from '$lib/components/prose/img.svelte'
  import code from '$lib/components/prose/code.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { img, code, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import Flex from '$lib/components/layout_flex.svelte'
  import Date from '$lib/components/post_date.svelte'
  import Toc from '$lib/components/post_toc.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  import Pagination from '$lib/components/post_pagination.svelte'
  import Footer from '$lib/components/footer.svelte'

  export let title = undefined
  export let date = undefined
  export let lastmod = undefined
  export let priority = undefined
  export let tags = undefined
  export let cover = undefined
  export let descr = undefined
  export let toc = undefined
  export let path = undefined

  let posts = undefined
  let post = undefined
  let index = undefined
  let prev = undefined
  let next = undefined

  if (browser) {
    posts = Object.entries(JSON.parse(localStorage.getItem('posts')))
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .flatMap(([, value]) => value)
    post = posts.find(post => post?.path === window.location.pathname)
    index = posts.findIndex(post => post?.path === window.location.pathname)
    prev = posts[index + 1]
    next = posts[index - 1]
  }
</script>

<Flex {title} {date} {lastmod} {priority} {tags} {cover} {descr} {path}>
  <div slot="left" class="h-full" />
  <div slot="right" class="h-full">
    {#if toc.length >= 1}
      <Toc {toc} />
    {/if}
  </div>
  <div slot="center">
    <article itemscope itemtype="https://schema.org/BlogPosting" class="card bg-base-100 <md:rounded-none shadow-xl mb-8">
      <div class="card-body">
        <h1 itemprop="name headline" class="card-title text-3xl">{title ?? post?.path}</h1>
        <Date post={{ date, lastmod, priority }} type="layout" />
        {#if !cover}
          <div class="divider my-6" />
        {/if}
        <main itemprop="articleBody" class="urara-prose prose">
          {#if cover}
            <Cover {cover} figureClass="-mx-8 !w-auto my-8" imgClass="w-full" />
          {/if}
          <slot />
        </main>
        {#if tags}
          <div class="divider my-0" />
          <div>
            {#each tags as tag}
              <a href="/?tags={tag}" class="btn btn-sm btn-ghost normal-case mt-2 mr-2">
                #{tag}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </article>
    {#if posts && post}
      {#if (posts.length > 1 && !post.priority) || post.priority[1] > 0}
        <Pagination {next} {prev} />
      {/if}
    {/if}
    <Footer />
  </div>
</Flex>
