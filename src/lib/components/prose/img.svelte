<script lang="ts">
  /* @see {@link https://github.com/sveltejs/kit/issues/241#issuecomment-1363621896} */

  type Image = {
    src: string
    w: number
    h: number
  }

  const sources = import.meta.glob<Image[]>(['/src/static/**/*.{jpg,jpeg,png,webp,avif}', '!/src/static/assets'], {
    query: {
      format: 'avif',
      quality: '80',
      width: '736',
      source: ''
    },
    import: 'default',
    eager: true
  })

  let className: string | undefined = undefined
  export { className as class }
  export let src: string
  export let alt: string = src
  export let loading: 'eager' | 'lazy' = 'lazy'
  export let decoding: 'async' | 'sync' | 'auto' = 'async'
  let source: Image[] | undefined = sources[`/src/static${src}`]
</script>

{#if source}
  <picture>
    <source srcset={source.map(({ src, w }) => `${src} ${w}w`).join(', ')} type="image/avif" />
    <img {src} {alt} class={className ?? 'rounded-lg my-2'} {loading} {decoding} />
  </picture>
{:else}
  <img {src} {alt} class={className ?? 'rounded-lg my-2'} {loading} {decoding} />
{/if}
