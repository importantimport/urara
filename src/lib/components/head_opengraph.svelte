<script lang="ts">
  import { site } from '$lib/config/site'
  import { icons } from '$lib/config/icons'
  import { validate } from '$lib/utils/src'
  export let post: Urara.Post
</script>

<svelte:head>
  <meta property="og:site_name" content={site.title} />
  <meta property="og:locale" content={site.lang} />
  {#if post?.path}
    <meta property="og:title" content={post.title ?? post.path} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={site.url + post.path} />
    <meta property="og:description" content={post.descr ?? site.descr} />
    <meta property="article:author" content={site.author.name} />
    <meta property="article:published_time" content={post.date} />
    <meta property="article:modified_time" content={post.lastmod ?? post.date} />
    {#if post.tags}
      <meta property="article:tag" content={post.tags.toString()} />
    {/if}
    {#if post.cover}
      <meta
        property="og:image"
        content={validate(Array.isArray(post.cover) ? post.cover[1] : post.cover, { absolute: true })} />
      <meta name="twitter:card" content="summary_large_image" />
    {:else}
      <meta property="og:image" content={validate(icons.maskable512.src ?? icons.any512.src, { absolute: true })} />
      <meta name="twitter:card" content="summary" />
    {/if}
  {:else}
    <meta property="og:title" content={site.title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={site.url} />
    <meta property="og:image" content={validate(icons.maskable512.src ?? icons.any512.src, { absolute: true })} />
    <meta property="og:description" content={site.descr} />
  {/if}
  {#if site.author.twitter}
    <meta name="twitter:site" content={site.author.twitter} />
    <meta name="twitter:creator" content={site.author.twitter} />
  {/if}
</svelte:head>
