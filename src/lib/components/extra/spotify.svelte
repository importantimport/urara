<script lang="ts">
  export let type: 'artist' | 'album' | 'track' = 'track'
  export let id: string
  export let theme: boolean = true
  export let compact: boolean = false
  export let width: string = '100%'
  export let height: string = compact ? '152' : '352'
  const src = `https://open.spotify.com/embed/${type}/${id}?${new URLSearchParams({
    utm_source: 'generator',
    theme: theme ? '1' : '0'
  }).toString()}`
</script>

<iframe
  title="Spotify music player"
  class="mb-4 rounded-box"
  {src}
  {width}
  {height}
  frameborder="0"
  allowfullscreen
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy" />
