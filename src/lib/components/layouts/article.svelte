<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import Head from '$lib/components/head.svelte'
  import Post from '$lib/components/layouts/_post.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  import Toc from '$lib/components/post_toc.svelte'

  export let created = undefined
  export let updated = undefined
  export let published = undefined

  export let title = undefined
  export let tags = undefined
  export let cover = undefined
  export let toc = undefined
  export let descr = undefined
  export let path = undefined
  export let flags = undefined
</script>

<Head post={{ layout: 'article', created, updated, published, title, tags, descr, cover, path }} />

<Post layout="article" {path} {flags} {tags} {created} {updated} {published}>
  <div slot="right" class="h-full hidden xl:block">
    {#if browser && toc?.length > 1}
      <Toc {toc} />
    {/if}
  </div>
  <div slot="top">
    {#if cover}
      <Cover {cover} figureClass="mx-4 md:mx-0 w-auto" imgClass="rounded-box w-full shadow-xl" />
    {/if}
  </div>
  <div slot="middle-bottom">
    <h1 itemprop="name headline" class="card-title text-3xl p-name">{title ?? path.slice(1)}</h1>
    <div class="divider my-4" />
  </div>
  <main slot="content" itemprop="articleBody" class="urara-prose prose e-content">
    <slot />
  </main>
</Post>
