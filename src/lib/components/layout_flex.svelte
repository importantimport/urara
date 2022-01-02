<script lang="ts">
  import { onMount } from 'svelte'
  import Head from '$lib/components/head.svelte'
  export let title = undefined
  export let date = undefined
  export let lastmod = undefined
  export let priority = undefined
  export let tags = undefined
  export let cover = undefined
  export let descr = undefined
  export let path = undefined
  let loaded = false
  export let head = true
  export let hidden = true
  onMount(() => (loaded = true))
</script>

{#if head !== false}
  <Head post={{ title, date, lastmod, priority, tags, cover, descr, path }} />
{/if}

<div class="flex flex-col flex-nowrap justify-center xl:(flex-row flex-wrap)">
  <div
    class="flex-1 w-full max-w-screen-md order-first xl:(max-w-96 delay-600 mr-0 px-8) transition-all duration-400 ease-out transform {hidden
      ? '<xl:hidden'
      : '<xl:mx-auto'} {loaded ? 'translate-x-0 opacity-100' : 'translate-x-[100vw] xl:translate-x-96 opacity-0'}">
    <slot name="left" />
  </div>
  <div
    class="flex-1 w-full max-w-screen-md xl:(order-last max-w-96 delay-600 ml-0 px-8) transition-all duration-400 ease-out transform {hidden
      ? '<xl:hidden'
      : '<xl:mx-auto'} {loaded ? 'translate-x-0 opacity-100' : '-translate-x-[100vw] xl:-translate-x-96 opacity-0'}">
    <slot name="right" />
  </div>
  <div class="flex-none w-full max-w-screen-md <xl:mx-auto">
    {#if $$slots.left || $$slots.right}
      <slot name="center" />
    {:else}
      <slot />
    {/if}
  </div>
</div>
