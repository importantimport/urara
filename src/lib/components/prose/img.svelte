<script lang="ts">
  let className: string | undefined = undefined
  export { className as class }
  export let src: string
  export let alt: string = src
  export let loading: 'eager' | 'lazy' = 'lazy'
  export let decoding: 'async' | 'sync' | 'auto' = 'async'
</script>

<img {src} {alt} class={className ?? 'rounded-lg my-2'} {loading} {decoding} />
