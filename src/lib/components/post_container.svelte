<script lang="ts">
  import { fly } from 'svelte/transition'
  import { browser } from '$app/environment'
  import Card from '$lib/components/post_card.svelte'
  import Head from '$lib/components/head.svelte'
  import Toc from '$lib/components/post_toc.svelte'
  import Action from '$lib/components/post_action.svelte'
  import Footer from '$lib/components/footer.svelte'
  export let post: Urara.Post
</script>

<Head {post} />

<div class="flex flex-col flex-nowrap justify-center xl:flex-row xl:flex-wrap">
  <div
    in:fly={{ x: 25, duration: 300, delay: 500 }}
    out:fly={{ x: 25, duration: 300 }}
    class="flex-1 w-full order-first ease-out transform mx-auto xl:mr-0 xl:ml-0">
    {#if browser}
      <Action {post} />
    {/if}
  </div>
  <div
    in:fly={{ x: -25, duration: 300, delay: 500 }}
    out:fly={{ x: -25, duration: 300 }}
    class="flex-1 w-full xl:order-last ease-out transform mx-auto xl:ml-0 xl:mr-0">
    {#if browser && post.toc}
      <div class="h-full hidden xl:block">
        <Toc toc={post.toc} />
      </div>
    {/if}
  </div>
  <div class="flex-none w-full max-w-screen-md mx-auto xl:mx-0">
    <Card {post}>
      <slot />
    </Card>
    <Footer sticky={true} />
  </div>
</div>
