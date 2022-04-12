<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Post from '$lib/components/layouts/_post.svelte'
  import Cover from '$lib/components/post_cover.svelte'

  export let created = undefined
  export let updated = undefined
  export let published = undefined

  export let cover = undefined
  export let tags = undefined
  export let path = undefined
  export let flags = undefined
</script>

<Head post={{ layout: 'photo', created, updated, published, cover, tags, path }} />

<Post layout="photo" {path} {flags} {tags} {created} {updated} {published}>
  <Cover {cover} slot="top" figureClass="mx-4 md:mx-0 w-auto" imgClass="rounded-box w-full shadow-xl" />
  <main slot="content" itemprop="articleBody" class="urara-prose prose p-name p-content">
    <slot />
  </main>
</Post>
