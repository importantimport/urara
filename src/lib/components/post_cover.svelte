<script lang="ts">
  import Image from '$lib/components/prose/img.svelte'
  let className = undefined
  let src: string, alt: string
  export let cover: Urara.Post['cover']
  export { className as class }
  Array.isArray(cover) ? ([src, alt] = [cover[1], cover[0]]) : ([src, alt] = [cover, cover])
</script>

<Image class={className} {src} {alt} />
