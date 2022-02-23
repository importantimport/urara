<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { page } from '$app/stores'
  import { browser } from '$app/env'
  import { genTags } from '$lib/utils/tags'
  import Flex from '$lib/components/layout_flex.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Post from '$lib/components/index_post.svelte'
  import Profile from '$lib/components/index_profile.svelte'
  import IconTrash from '~icons/heroicons-outline/trash'

  let allPosts: Urara.Post[]
  let allTags: { [tag: string]: number }
  let loaded: boolean
  let [posts, tags, years] = [[], [''], []]

  $: if (browser) {
    allPosts = Object.entries(JSON.parse(localStorage.getItem('posts')) as { [priority: number]: Urara.Post[] })
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))
    allTags = genTags(allPosts)
  }

  $: if (loaded && tags) posts = !tags ? allPosts : allPosts.filter(post => tags.every(tag => post.tags?.includes(tag)))
  $: if (posts)
    years = [posts[0]?.date ? new Date(posts[0].date).toJSON().substring(0, 4) : new Date().toJSON().substring(0, 4)]

  onMount(() => {
    if (browser) {
      tags = $page.url.searchParams.get('tags') ? $page.url.searchParams.get('tags').split(',') : []
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

<Flex page={{ path: '/' }}>
  <div slot="left" class="xl:max-w-sm xl:ml-auto">
    <Profile />
  </div>
  <div slot="right" class="xl:max-w-sm">
    {#if allTags && Object.keys(allTags).length > 0}
      <label
        id="tags"
        data-nosnippet
        tabindex="0"
        class="collapse collapse-arrow xl:sticky xl:top-24 rounded-none md:rounded-box mb-8 xl:ml-8">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          tags{#if tags?.length > 0}
            {#key tags}
              <span in:fly={{ y: -100, duration: 200, delay: 200 }} out:fly={{ y: 100, duration: 200 }}>
                ={tags.toString()}
              </span>
            {/key}
          {/if}
        </div>
        <div class="collapse-content">
          {#each Object.entries(allTags) as [tag]}
            <button id={tag} on:click={() => toggle(tag)} class="btn btn-sm btn-ghost normal-case mt-2 mr-2">
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
      {#if posts.length === 0}
        {#if loaded}
          <div
            in:fly={{ x: 100, duration: 200, delay: 400 }}
            out:fly={{ x: -100, duration: 200 }}
            class="p-10 bg-base-300 text-base-content text-center rounded-box mb-8">
            <div class="prose items-center">
              <h2>
                Not found: {tags?.length != 0 ? `[${tags.map(tag => `'${tag}'`).toString()}]` : ''}
              </h2>
              <button on:click={() => clean()} class="btn btn-secondary">
                <IconTrash class="inline-block w-6 h-6 mr-2" />
                tags = []
              </button>
            </div>
          </div>
          <!-- {:else}
          <div class="h-screen" /> -->
        {/if}
      {/if}
      <main itemprop="mainEntityOfPage" itemscope itemtype="https://schema.org/Blog">
        {#each posts as post, index}
          <div
            in:fly={{ x: index % 2 ? 100 : -100, duration: 200, delay: 400 }}
            out:fly={{ x: index % 2 ? -100 : 100, duration: 200 }}>
            {#if post.date && !post.priority && !years.includes(post.date.substring(0, 4))}
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
          in:fly={{ x: posts.length % 2 ? 100 : -100, duration: 200, delay: 400 }}
          out:fly={{ x: posts.length % 2 ? -100 : 100, duration: 200 }}>
          <Footer />
        </div>
      {/if}
    {/key}
  </div>
</Flex>
