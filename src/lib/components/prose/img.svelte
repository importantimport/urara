<script lang="ts">
  /* @see {@link https://github.com/sveltejs/kit/issues/241#issuecomment-1363621896} */

  const images = import.meta.glob(['/static/**/*.{jpg,jpeg,png,webp,avif}', '!/static/assets'], {
    import: 'default',
    eager: true
  })

  const sources = import.meta.glob(['/static/**/*.{jpg,jpeg,png,webp,avif}', '!/static/assets'], {
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

  type Image = {
    src: string
    w: number
    h: number
  }

  const image: Image = images[`/static${src}`] as any
  const source: Image[] = sources[`/static${src}`] as any
</script>

<picture>
  <source srcset={source.map(({ src, w }) => `${src} ${w}w`).join(', ')} type="image/avif" />
  <img src={image.src} {alt} class={className ?? 'rounded-lg my-2'} {loading} {decoding} />
</picture>
