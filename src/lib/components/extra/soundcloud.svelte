<script lang="ts">
  export let type: 'track' | 'playlist' = 'track'
  export let id: string
  export let visual: boolean = true
  export let color: string = '#ff5500'
  export let autoplay: boolean = false
  export let width: string = '100%'
  export let height: string = visual ? '300' : type === 'track' ? '166' : '450'
  const src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${type}s/${id}?${new URLSearchParams({
    color: color.startsWith('#') ? encodeURIComponent(color) : color,
    visual: visual ? 'true' : 'false',
    auto_play: autoplay ? 'true' : 'false',
    hide_related: 'false',
    show_comments: 'true',
    show_user: 'true',
    show_reposts: 'false',
    show_teaser: 'true'
  }).toString()}`
</script>

<iframe title="SoundCloud music player" class="mb-4" {width} {height} scrolling="no" frameborder="no" allow="autoplay" {src} />
