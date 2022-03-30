<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import { posts as storedPosts } from '$lib/stores/posts'
  import { comment as commentConfig } from '$lib/config/comment'
  import Head from '$lib/components/head.svelte'
  import Flex from '$lib/components/layouts/_flex.svelte'
  import Reply from '$lib/components/post_reply.svelte'
  import Status from '$lib/components/post_status.svelte'
  import Pagination from '$lib/components/post_pagination.svelte'
  import Comment from '$lib/components/post_comment.svelte'
  import Footer from '$lib/components/footer.svelte'

  export let date = undefined
  export let lastmod = undefined
  export let tags = undefined
  export let path = undefined

  export let replyTo = undefined

  let posts = undefined
  let post = undefined
  let index = undefined
  let prev = undefined
  let next = undefined

  $: if (browser)
    storedPosts.subscribe(storedPosts => {
      posts = storedPosts
      post = posts.find(post => post.path === path)
      index = posts.findIndex(post => post.path === path)
      prev = posts.slice(index + 1).find(post => !post.flags?.includes('hidden'))
      next = posts
        .slice(0, index)
        .reverse()
        .find(post => !post.flags?.includes('hidden'))
    })
</script>

<Head post={{ layout: 'reply', date, lastmod, tags, path }} />

<Flex>
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    class="card bg-base-100 rounded-none md:rounded-box md:shadow-xl mb-8 h-entry">
    <Reply {replyTo} class="mt-4 mx-4" />
    <div class="card-body gap-0">
      <Status post={{ layout: 'reply', date, lastmod, path }} />
      <main itemprop="articleBody" class="urara-prose prose p-name p-content">
        <slot />
      </main>
      {#if tags}
        <div class="divider mt-4 mb-0" />
        <div>
          {#each tags as tag}
            <a href="/?tags={tag}" class="btn btn-sm btn-ghost normal-case mt-2 mr-2 p-category">
              #{tag}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </article>
  {#if prev || next}
    <Pagination {next} {prev} />
  {/if}
  {#if browser && post?.comment !== false && commentConfig.use}
    <Comment {post} />
  {/if}
  <Footer />
</Flex>
