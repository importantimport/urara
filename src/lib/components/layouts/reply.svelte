<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Post from '$lib/components/layouts/_post.svelte'
  import Reply from '$lib/components/post_reply.svelte'

  export let created = undefined
  export let updated = undefined
  export let published = undefined

  export let tags = undefined
  export let path = undefined
  export let flags = undefined

  export let inReplyTo = undefined
</script>

<Head post={{ layout: 'reply', created, updated, published, tags, path }} />

<Post layout="reply" {path} {flags} {tags} {created} {updated} {published}>
  <Reply {inReplyTo} slot="top" class="mt-4 mx-4" />
  <main slot="content" itemprop="articleBody" class="urara-prose prose p-name p-content">
    <slot />
  </main>
</Post>
