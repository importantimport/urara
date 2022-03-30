<script lang="ts">
  let className = undefined
  export { className as class }
  export let src: string
  export let alt: string
</script>

<img {src} {alt} class="u-photo {className ?? 'rounded-lg my-2'}" loading="lazy" decoding="async" />
