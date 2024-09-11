<script lang='ts'>
  /* @see {@link https://github.com/sveltejs/kit/issues/241#issuecomment-1363621896} */

  type Image = {
    h: number
    src: string
    w: number
  }

  const sources = import.meta.glob<Image[]>(['/src/static/**/*.{jpg,jpeg,png,webp,avif}', '!/src/static/assets'], {
    eager: true,
    import: 'default',
    query: {
      format: 'avif',
      quality: '80',
      source: '',
      width: '736',
    },
  })

  let className: string | undefined
  export { className as class }
  export let src: string
  export let alt: string = src
  export let loading: 'eager' | 'lazy' = 'lazy'
  export let decoding: 'async' | 'auto' | 'sync' = 'async'
  const source: Image[] | undefined = sources[`/src/static${src}`]
</script>

{#if source}
  <picture>
    <source srcset={source.map(({ src, w }) => `${src} ${w}w`).join(', ')} type='image/avif' />
    <img {alt} class={className ?? 'rounded-lg my-2'} {decoding} {loading} {src} />
  </picture>
{:else}
  <img {alt} class={className ?? 'rounded-lg my-2'} {decoding} {loading} {src} />
{/if}
