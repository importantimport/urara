<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Post from '$lib/components/layouts/_post.svelte'

  export let path = undefined
  export let created = undefined
  export let updated = undefined
  export let published = undefined
  export let tags = undefined
  export let flags = undefined

  export let photo = undefined
</script>

<Head post={{ layout: 'photo', created, updated, published, photo, tags, path }} />

<Post layout="photo" {path} {flags} {tags} {created} {updated} {published}>
  <figure slot="top" class="mx-4 md:mx-0 w-auto">
    <Image src={photo} class="rounded-box w-full shadow-xl" />
  </figure>
  <main slot="content" itemprop="articleBody" class="urara-prose prose p-name p-content">
    <slot />
  </main>
</Post>
