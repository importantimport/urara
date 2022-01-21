<script lang="ts">
  import { validate } from '$lib/utils/src'
  let className = undefined
  export { className as class }
  export let src: string
  export let alt: string
  src = validate(src)
</script>

<img {src} {alt} class="u-photo {className ?? 'rounded-lg my-2'}" loading="lazy" decoding="async" />
