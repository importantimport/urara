<script lang="ts">
  export let id = undefined
  export let list = undefined
  export let playlist = undefined
  export let start = undefined
  export let autoplay = false
  export let disablekb = false
  export let controls = true
  export let fs = true
  export let loop = false

  const src = `https://www.youtube.com/embed/${id}?${list ? `listType=playlist&list=${list}&` : ''}${
    playlist ? `playlist=${playlist}&` : ''
  }${start ? `start=${start}` : ''}${autoplay ? 'autoplay=1&' : ''}${disablekb ? 'disablekb=1&' : ''}${
    controls ? '' : 'controls=0&'
  }${fs ? '' : 'fs=0&'}${loop ? 'loop=1' : ''}`
</script>

<div class="relative pb-[56.25%] mb-2">
  <iframe
    {src}
    class="absolute w-full h-full"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    loading="lazy"
    allowfullscreen />
</div>
