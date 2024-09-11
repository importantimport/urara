<script lang='ts'>
  import { browser, dev } from '$app/environment'
  import Head from '$lib/components/head_static.svelte'
  import Header from '$lib/components/header.svelte'
  import Transition from '$lib/components/transition.svelte'
  import { posts, tags } from '$lib/stores/posts'
  import { genTags } from '$lib/utils/posts'
  import { onMount } from 'svelte'
  import { registerSW } from 'virtual:pwa-register'
  import 'uno.css'

  import type { LayoutData } from './$types'

  import '../app.pcss'

  export let data: LayoutData

  let { path, res } = data

  $: if (data)
    path = data.path

  posts.set(res)
  tags.set(genTags(res))
  onMount(
    () =>
      !dev
        && browser
      && registerSW({
          immediate: true,
          onRegistered: r => r && setInterval(async () => await r.update(), 198964),
          onRegisterError: error => console.error(error),
        }),
  )
</script>

<Head />

<Header {path} />

<Transition {path}>
  <slot />
</Transition>
