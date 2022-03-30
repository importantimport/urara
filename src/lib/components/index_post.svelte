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
    class="card image-full before:!bg-transparent bg-base-100 hover:shadow-lg md:shadow-xl md:hover:shadow-2xl transition-shadow rounded-none md:rounded-box mb-8">
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
    class="card bg-base-100 hover:shadow-lg md:shadow-xl md:hover:shadow-2xl transition-shadow rounded-none md:rounded-box md:card-side mb-8">
    {#if post.layout === 'article' && post.cover}
      <Cover
        figureClass="order-first md:order-last mx-4 mt-4 md:mx-0 md:mt-0 md:w-3/5"
        imgClass="object-cover object-center h-full w-full rounded-box md:rounded-none shadow-lg md:shadow-none"
        cover={post.cover} />
    {/if}
    <div class="card-body">
      {#if post.layout === 'reply'}
        <Reply replyTo={post.replyTo} class="-mt-4 -mx-4 mb-4" />
      {/if}
      <Status {post} index={true} />
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
