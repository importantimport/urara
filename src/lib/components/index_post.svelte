<script lang="ts">
  import Status from '$lib/components/post_status.svelte'
  import Reply from '$lib/components/post_reply.svelte'
  import Image from '$lib/components/prose/img.svelte'
  export let post: Urara.Post
  export let loading: 'eager' | 'lazy' = 'lazy'
  export let decoding: 'async' | 'sync' | 'auto' = 'async'
</script>

{#if post.layout === 'photo'}
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    itemprop="blogPost"
    class="h-entry card image-full before:!bg-transparent bg-base-100 rounded-none md:rounded-box">
    <figure>
      <Image class="u-photo object-cover object-center h-full w-full" src={post.photo} {loading} {decoding} />
    </figure>
    <div class="card-body mt-auto">
      <Status {post} index={true} photo={true} />
    </div>
  </article>
{:else}
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    itemprop="blogPost"
    class="h-entry card bg-base-100  rounded-none md:rounded-box group {post.layout === 'article' && post.photo
      ? 'image-full before:!rounded-none'
      : ''}">
    {#if post.layout === 'article' && post.photo}
      <figure class="!block">
        <Image
          class="u-featured object-center h-full w-full absolute group-hover:scale-105 transition-transform duration-500 ease-in-out"
          src={post.photo}
          {loading}
          {decoding} />
      </figure>
    {/if}
    <div
      class="card-body {post.layout === 'article' && post.photo
        ? 'md:col-start-1 md:row-start-1 md:text-neutral-content md:z-20'
        : ''}">
      {#if post.layout === 'reply'}
        <Reply inReplyTo={post.inReplyTo} class="-mt-4 -mx-4 mb-4" />
      {/if}
      <Status {post} index={true} featured={post.layout === 'article' && post.photo ? true : false} />
      {#if post.layout === 'article'}
        <h1
          itemprop="name headline"
          class="card-title text-3xl mr-auto bg-[length:100%_0%] bg-[position:0_88%] underline decoration-4 decoration-transparent group-hover:decoration-primary hover:bg-[length:100%_100%] hover:text-primary-content bg-gradient-to-t from-primary to-primary bg-no-repeat transition-all ease-in-out duration-300">
          <a itemprop="url" class="u-url p-name" href={post.path}>{post.title ?? post.path.slice(1)}</a>
        </h1>
        {#if post.summary}
          <p itemprop="description" class="p-summary mb-auto">{post.summary}</p>
        {/if}
      {/if}
      {@html post.html}
    </div>
  </article>
{/if}
