<script lang="ts">
  import Date from '$lib/components/post_date.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  export let post: Urara.Post
</script>

<article
  itemscope
  itemtype="https://schema.org/BlogPosting"
  itemprop="blogPost"
  class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow rounded-none md:rounded-box md:card-side group mb-8">
  {#if post.cover}
    <Cover
      figureClass="w-full overflow-hidden order-first md:order-last md:rounded-box shadow-lg"
      imgClass="object-cover object-center h-full w-full transform-gpu transition-transform ease-in-out duration-[400ms] group-hover:scale-125"
      cover={post.cover} />
  {/if}
  <div class="card-body">
    <h1
      itemprop="name headline"
      class="card-title text-3xl transition-all ease-in-out underline decoration-4 decoration-transparent hover:decoration-primary">
      <a href={post.path}>{post.title ?? post.path.slice(1)}</a>
    </h1>
    {#if post.descr}
      <p itemprop="description" class="mb-auto">{post.descr}</p>
    {/if}
    <Date {post} type="index" />
  </div>
</article>
