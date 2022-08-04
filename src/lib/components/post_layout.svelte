<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import { typeOfPost } from '$lib/utils/posts'
  import Container from '$lib/components/post_container.svelte'
  // auto-generated
  export let path
  export let slug
  export let toc
  // common
  export let created
  export let updated
  export let published
  export let summary
  export let tags
  export let flags
  // specify
  export let title
  export let image
  export let in_reply_to
  // post
  let fm = { path, slug, toc, created, updated, published, summary, tags, flags, title, image, in_reply_to }
  let post = { type: typeOfPost(fm), ...fm }
</script>

<Container {post}>
  <slot />
</Container>
