<script lang="ts" context="module">
  export const prerender = true
  export const load = async ({ url, fetch }) => {
    const res = await fetch('/posts.json')
    return res.ok ? { props: { path: url.pathname, posts: await res.json() } } : { props: { path: url.pathname } }
  }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import { fly } from 'svelte/transition'
  import Header from '$lib/components/header.svelte'
  import '../app.css'
  export let posts: { [priority: number]: Urara.Post[] }
  export let path: string
  if (browser) localStorage.setItem('posts', JSON.stringify(posts))
</script>

<Header />

{#key path}
  <div class="min-h-screen pt-24 lg:mb-16" in:fly={{ y: 100, duration: 200, delay: 200 }} out:fly={{ y: -100, duration: 200 }}>
    <slot />
  </div>
{/key}
