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
</script>

<Head post={{ layout: 'note', created, updated, published, tags, path }} />

<Post layout="note" {path} {flags} {tags} {created} {updated} {published}>
  <main slot="content" itemprop="articleBody" class="urara-prose prose p-name p-content">
    <slot />
  </main>
</Post>
