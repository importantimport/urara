<script lang="ts">
  import Image from '$lib/components/prose/img.svelte'
  export let cover: Urara.Post.Article['cover']
  export let figureClass: string
  export let imgClass: string
  let src: string, alt: string
  Array.isArray(cover) ? ([src, alt] = [cover[1], cover[0]]) : ([src, alt] = [cover, cover])
</script>

<figure class={figureClass}>
  <Image class="u-photo {imgClass}" {src} {alt} />
</figure>
