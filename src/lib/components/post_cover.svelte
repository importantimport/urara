<script lang="ts">
  import Image from '$lib/components/prose/img.svelte'
  export let cover: Urara.Post.Article['cover']
  export let figureClass: string
  export let imgClass: string
  export let loading: 'eager' | 'lazy' = 'lazy'
  export let decoding: 'async' | 'sync' | 'auto' = 'async'
</script>

<figure class={figureClass}>
  <Image class="u-photo {imgClass}" src={cover} alt={cover} {loading} {decoding} />
</figure>
