<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { page } from '$app/stores'
  import { browser } from '$app/env'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import IndexPost from '$lib/components/index_post.svelte'
  import Skeleton from '$lib/components/skeleton.svelte'
  import { genTags } from '$lib/utils/tags'

  let allPosts: Urara.Post[]
  let allTags: Record<string, number>
  let loaded: boolean
  let [posts, tags, years] = [[], [''], []]

  $: if (browser) {
    allPosts = Object.entries(JSON.parse(localStorage.getItem('posts')) as Record<number, Urara.Post[]>)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))
    allTags = genTags(allPosts)
  }

  $: if (loaded && tags) posts = !tags ? allPosts : allPosts.filter(post => tags.every(tag => post.tags?.includes(tag)))

  $: if (posts) years = [new Date().toJSON().substring(0, 4)]

  onMount(() => {
    if (browser) {
      tags = $page.query.get('tags') ? $page.query.get('tags').split(',') : []
      tags?.forEach(tag => document.getElementById(tag).classList.toggle('!btn-secondary'))
      loaded = true
    }
  })

  const toggle = (tag: string) => {
    document.getElementById(tag).classList.toggle('!btn-secondary')
    tags.includes(tag) ? (tags = tags.filter(tagName => tagName != tag)) : (tags = [...tags, tag])
    window.history.replaceState({}, '', tags.length != 0 ? `?tags=${tags.toString()}` : `/`)
  }

  const clean = () => {
    tags.forEach(tag => document.getElementById(tag).classList.remove('!btn-secondary'))
    tags = []
    window.history.replaceState({}, '', `/`)
  }
</script>

<Head />

<div class="px-4 lg:px-0 mx-auto w-full max-w-screen-md">
  {#if allTags && Object.keys(allTags).length > 0}
    <label tabindex="0" class="collapse bg-base-100 shadow-xl rounded-box collapse-arrow mb-8">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">
        tags{#if loaded && tags?.length > 0}
          <span in:fly={{ y: -100, duration: 250, delay: 300 }} out:fly={{ y: 100, duration: 250 }}>
            ={tags.toString()}
          </span>
        {/if}
      </div>
      <div class="collapse-content">
        {#each Object.entries(allTags) as [tag]}
          <button id={tag} on:click={() => toggle(tag)} class="btn btn-sm btn-ghost mt-2 mr-2">
            #{tag}
          </button>
        {/each}
      </div>
    </label>
  {/if}
  {#key posts}
    <!-- {:else} is not used because there is a problem with the transition -->
    {#if posts.length == 0}
      {#if !loaded}
        <Skeleton count="5" />
      {:else}
        <div
          in:fly={{ x: 100, duration: 250, delay: 300 }}
          out:fly={{ x: -100, duration: 250 }}
          class="p-10 bg-base-300 text-base-content footer footer-center rounded-box mb-8"
        >
          <div class="prose items-center">
            <h2>
              Not found: {tags?.length != 0 ? `[${tags.map(tag => `'${tag}'`).toString()}]` : ''}
            </h2>
            <button on:click={() => clean()} class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-6 w-6 mr-2 fill-none" viewBox="0 0 24 24">
                <path
                  stroke="current cap-round join-round width-2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              tags = []
            </button>
          </div>
        </div>
      {/if}
    {/if}
    {#each posts as post, index}
      {#if post.date && !post.priority && !years.includes(post.date.substring(0, 4))}
        <div class="divider mb-8">
          {years.push(post.date.substring(0, 4)) && post.date.substring(0, 4)}
        </div>
      {/if}
      <IndexPost {post} {index} />
    {/each}
    <Footer />
  {/key}
</div>
