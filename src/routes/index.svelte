<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { page } from '$app/stores'
  import { browser } from '$app/env'
  import { posts as storedPosts, tags as storedTags } from '$lib/stores/posts'
  import Head from '$lib/components/head.svelte'
  import Flex from '$lib/components/layouts/_flex.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Post from '$lib/components/index_post.svelte'
  import Profile from '$lib/components/index_profile.svelte'
  import IconTrash from '~icons/heroicons-outline/trash'

  let allPosts: Urara.Post[]
  let allTags: string[]
  let loaded: boolean
  let [posts, tags, years] = [[], [], []]

  $: storedPosts.subscribe(
    storedPosts => (allPosts = (storedPosts as Urara.Post[]).filter(post => !post.flags?.includes('hidden')))
  )

  $: storedTags.subscribe(storedTags => (allTags = storedTags as string[]))

  $: if (posts)
    years = [posts[0]?.date ? new Date(posts[0].date).toJSON().substring(0, 4) : new Date().toJSON().substring(0, 4)]

  $: if (tags) {
    if (loaded) posts = !tags ? allPosts : allPosts.filter(post => tags.every(tag => post.tags?.includes(tag)))
    if (browser && window.location.pathname === '/')
      window.history.replaceState({}, '', tags.length > 0 ? `?tags=${tags.toString()}` : `/`)
  }

  onMount(() => {
    if (browser) {
      tags = $page.url.searchParams.get('tags') ? $page.url.searchParams.get('tags').split(',') : []
      loaded = true
    }
  })
</script>

<Head />

<Flex>
  <div slot="left" class="xl:max-w-sm xl:ml-auto">
    <Profile />
  </div>
  <div slot="right" class="xl:max-w-sm">
    {#if allTags && Object.keys(allTags).length > 0}
      <label
        id="tags"
        data-nosnippet
        tabindex="0"
        class="collapse collapse-arrow xl:sticky xl:top-24 rounded-none md:rounded-box xl:ml-8">
        <input class="hidden md:inline-block" type="checkbox" />
        <div class="collapse-title text-xl font-medium hidden md:block">
          tags{#if tags?.length > 0}
            {#key tags}
              <span in:fly={{ y: -100, duration: 200, delay: 200 }} out:fly={{ y: 100, duration: 200 }}>
                ={tags.toString()}
              </span>
            {/key}
          {/if}
        </div>
        <div
          class="collapse-content flex md:block overflow-x-auto md:overflow-x-hidden overflow-y-hidden max-h-24 my-auto md:max-h-0 max-w-fit md:max-w-full">
          {#each allTags as tag}
            <button
              id={tag}
              on:click={() => (tags.includes(tag) ? (tags = tags.filter(tagName => tagName != tag)) : (tags = [...tags, tag]))}
              class:!btn-secondary={tags.includes(tag)}
              class:shadow-lg={tags.includes(tag)}
              class="btn btn-sm btn-ghost normal-case border-dotted border-base-content/20 border-2 my-8 md:my-1 mx-1">
              #{tag}
            </button>
          {/each}
        </div>
      </label>
    {/if}
  </div>
  <div slot="center">
    {#key posts}
      <!-- {:else} is not used because there is a problem with the transition -->
      {#if loaded && posts.length === 0}
        <div
          in:fly={{ x: 100, duration: 200, delay: 400 }}
          out:fly={{ x: -100, duration: 200 }}
          class="p-10 bg-base-300 text-base-content text-center rounded-box mb-8">
          <div class="prose items-center">
            <h2>
              Not found: {tags?.length != 0 ? `[${tags.map(tag => `'${tag}'`).toString()}]` : ''}
            </h2>
            <button on:click={() => (tags = [])} class="btn btn-secondary">
              <IconTrash class="inline-block w-6 h-6 mr-2" />
              tags = []
            </button>
          </div>
        </div>
      {/if}
      <main itemprop="mainEntityOfPage" itemscope itemtype="https://schema.org/Blog">
        {#each posts as post, index}
          <div
            in:fly={{ x: index % 2 ? 100 : -100, duration: 200, delay: 400 }}
            out:fly={{ x: index % 2 ? -100 : 100, duration: 200 }}>
            {#if post.date && !years.includes(post.date.substring(0, 4))}
              <div class="divider mb-8">
                {years.push(post.date.substring(0, 4)) && post.date.substring(0, 4)}
              </div>
            {/if}
            <Post {post} />
          </div>
        {/each}
      </main>
      {#if loaded}
        <div
          in:fly={{ x: posts.length + (1 % 2) ? 100 : -100, duration: 200, delay: 400 }}
          out:fly={{ x: posts.length + (1 % 2) ? -100 : 100, duration: 200 }}>
          <Footer />
        </div>
      {/if}
    {/key}
  </div>
</Flex>
