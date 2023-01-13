<script lang="ts">
  export let id: string
  export let list: boolean | undefined = undefined
  export let playlist: string | undefined = undefined
  export let start: string | undefined = undefined
  export let autoplay: boolean = false
  export let disablekb: boolean = false
  export let controls: boolean = true
  export let fs = true
  export let loop = false
  const src = `https://www.youtube.com/embed/${id}?${new URLSearchParams({
    ...(list ? { listType: 'playlist', list: 'true' } : {}),
    ...(playlist ? { playlist } : {}),
    ...(start ? { start } : {}),
    autoplay: autoplay ? '1' : '0',
    disablekb: disablekb ? '1' : '0',
    controls: controls ? '1' : '0',
    fs: fs ? '1' : '0',
    loop: loop ? '1' : '0'
  }).toString()}`
</script>

<div class="relative pb-[56.25%] mb-4">
  <iframe
    {src}
    class="absolute w-full h-full"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    loading="lazy"
    allowfullscreen />
</div>
