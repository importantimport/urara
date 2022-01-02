<script lang="ts">
  import Date from '$lib/components/post_date.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  export let post: Urara.Post
</script>

<article
  itemscope
  itemtype="https://schema.org/BlogPosting"
  itemprop="blogPost"
  class="card bg-base-100 urara-card-shadow md:card-side <md:rounded-none group mb-8">
  {#if post.cover}
    <Cover
      figureClass="overflow-hidden order-first md:(order-last rounded-box) shadow-lg"
      imgClass="object-cover object-center h-full w-full transform-gpu transition-transform ease-in-out duration-400 group-hover:scale-120"
      cover={post.cover} />
  {/if}
  <div class="card-body">
    <h1
      itemprop="name headline"
      class="card-title text-3xl transition-all ease-in-out underline underline-4 underline-transparent hover:underline-primary">
      <a href={post.path}>{post.title ?? post.path.slice(1)}</a>
    </h1>
    {#if post.descr}
      <p itemprop="description" class="mb-auto">{post.descr}</p>
    {/if}
    <Date {post} type="index" />
  </div>
</article>
