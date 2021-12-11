<script lang="ts" context="module">
  import img from '$lib/components/prose/img.svelte'
  import code from '$lib/components/prose/code.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { img, code, table }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Date from '$lib/components/post_date.svelte'
  import Toc from '$lib/components/post_toc.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  import Pagination from '$lib/components/post_pagination.svelte'

  export let title = undefined
  export let date = undefined
  export let lastmod = undefined
  export let priority = undefined
  export let tags = undefined
  export let cover = undefined
  export let descr = undefined
  export let toc = undefined

  let loaded = false
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
  onMount(() => (loaded = true))
</script>

<Head post={{ title, date, lastmod, priority, tags, cover, descr }} />

<div class="flex flex-col flex-nowrap justify-center xl:(flex-row flex-wrap)">
  <div
    class="flex-1 w-full max-w-screen-md order-first <xl:hidden xl:(max-w-96 delay-400 mr-0 px-8) transition-all duration-400 ease-out transform {loaded
      ? 'translate-x-0 opacity-100'
      : 'translate-x-[100vw] xl:translate-x-96 opacity-0'}" />
  <div
    class="flex-1 w-full max-w-screen-md <xl:hidden xl:(order-last max-w-96 delay-400 ml-0 px-8) transition-all duration-400 ease-out transform {loaded
      ? 'translate-x-0 opacity-100'
      : '-translate-x-[100vw] xl:-translate-x-96 opacity-0'}">
    {#if toc.length >= 1}
      <Toc {toc} />
    {/if}
  </div>
  <div class="flex-none w-full max-w-screen-md <xl:mx-auto">
    <article itemscope itemtype="https://schema.org/BlogPosting" class="card bg-base-100 <md:rounded-none shadow-xl mb-8">
      <div class="card-body">
        <h1 itemprop="name headline" class="card-title text-3xl">{title ?? post?.path}</h1>
        <Date post={{ date, lastmod, priority }} type="layout" />
        {#if !cover}
          <div class="divider" />
        {/if}
        <main itemprop="articleBody" class="urara-prose prose">
          {#if cover}
            <Cover {cover} figureClass="-mx-8 !w-auto my-4" imgClass="w-full" />
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
</div>
