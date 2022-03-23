<script lang="ts" context="module">
  export const prerender = true
  export const load = async ({ url, fetch }) => ({
    props: {
      path: url.pathname,
      res: await (await fetch('/posts.json')).json()
    }
  })
</script>

<script lang="ts">
  import { fly } from 'svelte/transition'
  import { genTags } from '$lib/utils/posts'
  import { posts, tags } from '$lib/stores/posts'
  import Header from '$lib/components/header.svelte'
  import '../app.css'
  export let res: { [priority: number]: Urara.Post[] }
  export let path: string
  posts.set(res)
  tags.set(genTags(Object.entries(res).flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))))
</script>

<Header />

{#key path}
  <div class="min-h-screen pt-24 lg:mb-16" in:fly={{ y: 100, duration: 200, delay: 200 }} out:fly={{ y: -100, duration: 200 }}>
    <slot />
  </div>
{/key}
