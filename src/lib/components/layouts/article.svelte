<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import Head from '$lib/components/head.svelte'
  import Post from '$lib/components/layouts/_post.svelte'
  import Toc from '$lib/components/post_toc.svelte'

  export let path = undefined
  export let created = undefined
  export let updated = undefined
  export let published = undefined
  export let tags = undefined
  export let flags = undefined

  export let title = undefined
  export let summary = undefined
  export let photo = undefined
  export let toc = undefined
</script>

<Head post={{ layout: 'article', created, updated, published, title, tags, summary, photo, path }} />

<Post layout="article" {path} {flags} {tags} {created} {updated} {published}>
  <div slot="right" class="h-full hidden xl:block">
    {#if browser && toc?.length > 1}
      <Toc {toc} />
    {/if}
  </div>
  <div slot="top">
    {#if photo}
      <figure class="!block mx-4 md:mx-0 w-auto">
        <Image class="u-featured rounded-box w-full shadow-xl" src={photo} />
      </figure>
    {/if}
  </div>
  <div slot="middle-bottom">
    <h1 itemprop="name headline" class="card-title text-3xl mb-8 p-name">{title ?? path.slice(1)}</h1>
    {#if summary}
      <p class="hidden p-summary">{summary}</p>
    {/if}
  </div>
  <main slot="content" itemprop="articleBody" class="urara-prose prose e-content">
    <slot />
  </main>
</Post>
