<script lang='ts'>
  import { browser } from '$app/environment'
  import Comment from '$lib/components/post_comment.svelte'
  import Pagination from '$lib/components/post_pagination.svelte'
  import Reply from '$lib/components/post_reply.svelte'
  import Status from '$lib/components/post_status.svelte'
  import Image from '$lib/components/prose/img.svelte'
  import { post as postConfig } from '$lib/config/post'
  import { posts as storedPosts } from '$lib/stores/posts'
  import { title as storedTitle } from '$lib/stores/title'

  export let post: Urara.Post
  export let preview: boolean = false
  export let loading: 'eager' | 'lazy' = 'lazy'
  export let decoding: 'async' | 'auto' | 'sync' = 'async'
  // pagination
  let index: number
  let prev: undefined | Urara.Post
  let next: undefined | Urara.Post
  if (browser && !preview) {
    storedPosts.subscribe((storedPosts: Urara.Post[]) => {
      index = storedPosts.findIndex(storedPost => storedPost.path === post.path)
      prev = storedPosts
        .slice(0, index)
        .reverse()
        .find(post => !post.flags?.includes('unlisted'))
      next = storedPosts.slice(index + 1).find(post => !post.flags?.includes('unlisted'))
      storedTitle.set(post.title ?? post.path.slice(1))
    })
  }
</script>

<svelte:element
  class='h-entry card bg-base-100 rounded-none md:rounded-box md:shadow-xl overflow-hidden z-10'
  class:before:!rounded-none={preview && post.image}
  class:group={preview}
  class:image-full={preview && post.type === 'article' && post.image}
  class:lg:mb-16={!preview}
  class:md:mb-8={!preview}
  itemprop='blogPost'
  itemscope
  itemtype='https://schema.org/BlogPosting'
  this={post.type === 'article' ? 'article' : 'div'}>
  {#if !preview && postConfig.bridgy}
    <div class='hidden' id='bridgy'>
      {#each post.flags?.some(flag => flag.startsWith('bridgy')) ? post.flags.flatMap(flag => (flag.startsWith('bridgy') ? flag.slice(7) : [])) : [...(postConfig.bridgy.post ?? []), ...(postConfig.bridgy[post.type] ?? [])] as target}
        {#if target === 'fed'}
          <a href='https://fed.brid.gy/'>fed</a>
        {:else}
          <a href='https://brid.gy/publish/{target}'>{target}</a>
        {/if}
      {/each}
    </div>
  {/if}
  {#if post.in_reply_to}
    <Reply class='mt-4 mx-4' in_reply_to={post.in_reply_to} />
  {/if}
  {#if post.image && preview}
    <figure class='!block'>
      <Image
        alt={post.alt ?? post.image}
        class={post.type === 'article'
          ? 'u-featured object-center h-full w-full absolute group-hover:scale-105 transition-transform duration-500 ease-in-out'
          : 'u-photo rounded-xl md:rounded-b-none -mb-6 md:-mb-2'}
        {decoding}
        {loading}
        src={post.image} />
    </figure>
  {/if}
  <div
    class={`card-body gap-0 ${
      preview && post.type === 'article' && post.image ? 'md:col-start-1 md:row-start-1 md:text-neutral-content md:z-20' : ''
    }`}>
    <div class='flex flex-col gap-2'>
      {#if post.image && !preview}
        <figure
          class={`md:order-last rounded-box shadow-xl mb-4 ${
            post.type === 'article' ? 'flex-col gap-2 -mx-4 -mt-8 md:mt-0' : 'flex-col -mx-8'
          }`}>
          <Image
            alt={post.alt ?? post.image}
            class={`${post.type === 'article' ? 'u-featured' : 'u-photo'}`}
            {decoding}
            {loading}
            src={post.image} />
        </figure>
      {/if}
      <Status {post} {preview} />
      {#if post.title}
        {#if preview}
          <h2
            class='card-title text-3xl mr-auto bg-[length:100%_0%] bg-[position:0_88%] underline decoration-4 decoration-transparent group-hover:decoration-primary hover:bg-[length:100%_100%] hover:text-primary-content bg-gradient-to-t from-primary to-primary bg-no-repeat transition-all ease-in-out duration-300'
            itemprop='name headline'>
            <a class='u-url p-name' href={post.path} itemprop='url'>{post.title ?? post.path.slice(1)}</a>
          </h2>
        {:else}
          <h1 class='card-title text-3xl mb-8 p-name' itemprop='name headline'>{post.title ?? post.path.slice(1)}</h1>
        {/if}
      {/if}
      {#if post.summary}
        <p class='p-summary mb-auto' class:hidden={!preview || post.type !== 'article'} itemprop='description'>
          {post.summary}
        </p>
      {/if}
    </div>
    <main class='urara-prose prose e-content' class:mt-4={post.type !== 'article'} itemprop='articleBody'>
      {#if !preview}
        <slot />
      {:else if post.html}
        {@html post.html}
      {/if}
    </main>
    {#if !preview && post.tags}
      <div class='divider mt-4 mb-0' />
      <div>
        {#each post.tags as tag}
          <a class='btn btn-sm btn-ghost normal-case mt-2 mr-2 p-category' href='/?tags={tag}'>
            #{tag}
          </a>
        {/each}
      </div>
    {/if}
  </div>
  {#if !preview}
    {#if (prev || next) && !post.flags?.includes('pagination-disabled') && !post.flags?.includes('unlisted')}
      <Pagination {next} {prev} />
    {/if}
    {#if browser && postConfig.comment && !post.flags?.includes('comment-disabled')}
      <Comment config={postConfig.comment} {post} />
    {/if}
  {/if}
</svelte:element>
