<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import Head from '$lib/components/head.svelte'
  import Post from '$lib/components/layouts/_post.svelte'
  import Status from '$lib/components/post_status.svelte'
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
  export let alt = undefined
  export let toc = undefined
</script>

<Head post={{ layout: 'article', path, created, updated, published, tags, flags, title, summary, photo, alt, toc }} />

<Post post={{ layout: 'article', path, created, updated, published, tags, flags, title, summary, photo, alt, toc }}>
  <div slot="right" class="h-full hidden xl:block">
    {#if browser && toc?.length > 1}
      <Toc {toc} />
    {/if}
  </div>
  <div slot="middle" class="flex flex-col">
    {#if photo}
      <figure class="flex-col gap-2 -mx-4 mb-4 w-auto -mt-8 md:mt-0 md:mb-8 md:order-last">
        <Image class="u-featured rounded-box w-full shadow-xl" src={photo} alt={alt ?? photo} loading="eager" decoding="auto" />
        {#if alt}
          <figcaption>{@html alt}</figcaption>
        {/if}
      </figure>
    {/if}
    <Status
      post={{
        layout: 'article',
        path,
        created,
        updated,
        published,
        tags,
        flags,
        title,
        summary,
        photo,
        alt,
        toc
      }} />
    <h1 itemprop="name headline" class="card-title text-3xl mt-2 mb-8 p-name">{title ?? path.slice(1)}</h1>
    {#if summary}
      <p class="hidden p-summary">{summary}</p>
    {/if}
  </div>
  <main slot="content" itemprop="articleBody" class="urara-prose prose e-content">
    <slot />
  </main>
</Post>
