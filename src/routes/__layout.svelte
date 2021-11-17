<script lang="ts" context="module">
  export const prerender = true
  export const load = async ({ page, fetch }) => {
    const res = await fetch('/posts.json')
    return res.ok ? { props: { path: page.path, posts: await res.json() } } : { props: { path: page.path } }
  }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import { fly } from 'svelte/transition'
  import Header from '$lib/components/header.svelte'
  import 'virtual:windi.css'
  import '../app.css'
  export let posts: Record<number, Urara.Post[]>
  export let path: string
  if (browser) {
    // @ts-ignore: Cannot find module 'virtual:windi-devtools' or its corresponding type declarations.
    import('virtual:windi-devtools')
    localStorage.setItem('posts', JSON.stringify(posts))
  }
</script>

<Header />

{#key path}
  <div
    class="min-h-screen pt-16 mb-8 lg:mb-16"
    in:fly={{ y: 100, duration: 250, delay: 300 }}
    out:fly={{ y: 100, duration: 250 }}>
    <slot />
  </div>
{/key}
