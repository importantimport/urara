<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { posts as storedPosts, tags as storedTags } from '$lib/stores/posts'
  import { title as storedTitle } from '$lib/stores/title'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Post from '$lib/components/post_card.svelte'
  import Profile from '$lib/components/index_profile.svelte'

  let allPosts: Urara.Post[]
  let allTags: string[]
  let loaded: boolean
  let [posts, tags, years]: [Urara.Post[], string[], number[]] = [[], [], []]

  storedTitle.set('')

  $: storedPosts.subscribe(storedPosts => (allPosts = storedPosts.filter(post => !post.flags?.includes('unlisted'))))

  $: storedTags.subscribe(storedTags => (allTags = storedTags as string[]))

  $: if (posts.length > 1) years = [new Date(posts[0].published ?? posts[0].created).getFullYear()]

  $: if (tags) {
    posts = !tags ? allPosts : allPosts.filter(post => tags.every(tag => post.tags?.includes(tag)))
    if (browser && window.location.pathname === '/')
      goto(tags.length > 0 ? `?tags=${tags.toString()}` : `/`, { replaceState: true })
  }

  onMount(() => {
    if (browser) {
      if ($page.url.searchParams.get('tags')) tags = $page.url.searchParams.get('tags')?.split(',') ?? []
      loaded = true
    }
  })
</script>

<Head />

<div class="flex flex-col flex-nowrap justify-center xl:flex-row xl:flex-wrap h-feed">
  <div
    in:fly={{ x: 25, duration: 300, delay: 500 }}
    out:fly={{ x: 25, duration: 300 }}
    class="flex-1 w-full max-w-screen-md order-first mx-auto xl:mr-0 xl:ml-8 xl:max-w-md">
    <Profile />
  </div>
  <div
    in:fly={{ x: -25, duration: 300, delay: 500 }}
    out:fly={{ x: -25, duration: 300 }}
    class="flex-1 w-full max-w-screen-md xl:order-last mx-auto xl:ml-0 xl:mr-8 xl:max-w-md">
    {#if allTags && Object.keys(allTags).length > 0}
      <div
        class="flex xl:flex-wrap gap-2 overflow-x-auto xl:overflow-x-hidden overflow-y-hidden max-h-24 my-auto xl:max-h-fit max-w-fit xl:max-w-full pl-8 md:px-0 xl:pl-8 xl:pt-8">
        {#each allTags as tag}
          <button
            id={tag}
            on:click={() => (tags.includes(tag) ? (tags = tags.filter(tagName => tagName != tag)) : (tags = [...tags, tag]))}
            class:!btn-secondary={tags.includes(tag)}
            class:shadow-lg={tags.includes(tag)}
            class="btn btn-sm btn-ghost normal-case border-dotted border-base-content/20 border-2 mt-4 mb-8 xl:m-0">
            #{tag}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  <div class="flex-none w-full max-w-screen-md mx-auto xl:mx-0">
    {#key posts}
      <!-- {:else} is not used because there is a problem with the transition -->
      {#if loaded && posts.length === 0}
        <div
          in:fly={{ x: 100, duration: 300, delay: 500 }}
          out:fly={{ x: -100, duration: 300 }}
          class="bg-base-300 text-base-content shadow-inner text-center md:rounded-box p-10 -mb-2 md:mb-0 relative z-10">
          <div class="prose items-center">
            <h2>
              Not found: [{#each tags as tag, i}
                '{tag}'{#if i + 1 < tags.length},{/if}
              {/each}]
            </h2>
            <button on:click={() => (tags = [])} class="btn btn-secondary">
              <span class="i-heroicons-outline-trash mr-2" />
              tags = []
            </button>
          </div>
        </div>
      {/if}
      <main
        class="flex flex-col relative bg-base-100 md:bg-transparent md:gap-8 z-10"
        itemprop="mainEntityOfPage"
        itemscope
        itemtype="https://schema.org/Blog">
        {#each posts as post, index}
          {@const year = new Date(post.published ?? post.created).getFullYear()}
          {#if !years.includes(year)}
            <div
              in:fly={{ x: index % 2 ? 100 : -100, duration: 300, delay: 500 }}
              out:fly={{ x: index % 2 ? -100 : 100, duration: 300 }}
              class="divider my-4 md:my-0">
              {years.push(year) && year}
            </div>
          {/if}
          <div
            in:fly={{ x: index % 2 ? 100 : -100, duration: 300, delay: 500 }}
            out:fly={{ x: index % 2 ? -100 : 100, duration: 300 }}
            class="rounded-box transition-all duration-500 ease-in-out hover:z-30 hover:shadow-lg md:shadow-xl md:hover:shadow-2xl md:hover:-translate-y-0.5">
            <Post {post} preview={true} loading={index < 5 ? 'eager' : 'lazy'} decoding={index < 5 ? 'auto' : 'async'} />
          </div>
        {/each}
      </main>
      <div
        class:hidden={!loaded}
        class="sticky bottom-0 md:static md:mt-8"
        in:fly={{ x: posts.length + (1 % 2) ? 100 : -100, duration: 300, delay: 500 }}
        out:fly={{ x: posts.length + (1 % 2) ? -100 : 100, duration: 300 }}>
        <div class="divider mt-0 mb-8 hidden lg:flex" />
        <Footer />
      </div>
    {/key}
  </div>
</div>
