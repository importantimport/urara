<script context='module' lang='ts'>
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'

  export { Image as img, table }
</script>

<script lang='ts'>
  import Container from '$lib/components/post_container.svelte'
  import { typeOfPost } from '$lib/utils/posts'
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
  const fm = { created, flags, image, in_reply_to, path, published, slug, summary, tags, title, toc, updated }
  const post = { type: typeOfPost(fm), ...fm }
</script>

<Container {post}>
  <slot />
</Container>
