<script lang="ts">
  import Status from '$lib/components/post_status.svelte'
  import Reply from '$lib/components/post_reply.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  export let post: Urara.Post
</script>

{#if post.layout === 'photo'}
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    itemprop="blogPost"
    class="card image-full before:!bg-transparent bg-base-100 hover:z-30 hover:shadow-lg md:shadow-xl md:hover:shadow-2xl transition-shadow rounded-none md:rounded-box">
    <Cover figureClass="" imgClass="object-cover object-center h-full w-full" cover={post.cover} />
    <div class="card-body mt-auto">
      <Status {post} index={true} photo={true} />
    </div>
  </article>
{:else}
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    itemprop="blogPost"
    class="card bg-base-100 hover:z-30 hover:shadow-lg md:shadow-xl md:hover:shadow-2xl transition-shadow rounded-none md:rounded-box {post.layout ===
      'article' && post.cover
      ? 'image-full group before:!rounded-none'
      : ''}">
    {#if post.layout === 'article' && post.cover}
      <Cover
        figureClass="!block"
        imgClass="object-center h-full w-full absolute group-hover:scale-110 transition-transform duration-500 ease-in-out"
        cover={post.cover} />
    {/if}
    <div
      class="card-body {post.layout === 'article' && post.cover
        ? 'md:col-start-1 md:row-start-1 md:text-neutral-content md:z-20'
        : ''}">
      {#if post.layout === 'reply'}
        <Reply replyTo={post.replyTo} class="-mt-4 -mx-4 mb-4" />
      {/if}
      <Status {post} index={true} cover={post.layout === 'article' && post.cover ? true : false} />
      {#if post.layout === 'article'}
        <h1
          itemprop="name headline"
          class="card-title text-3xl transition-all ease-in-out underline decoration-4 decoration-transparent hover:decoration-primary">
          <a itemprop="url" class="u-url" href={post.path}>{post.title ?? post.path.slice(1)}</a>
        </h1>
        {#if post.descr}
          <p itemprop="description" class="mb-auto">{post.descr}</p>
        {/if}
      {/if}
      {@html post.html}
    </div>
  </article>
{/if}
