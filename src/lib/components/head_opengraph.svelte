<script lang="ts">
  import { site } from '$lib/config/site'
  import { icon } from '$lib/config/icon'
  export let post: Urara.Post = undefined
  export let page: Urara.Page = undefined
</script>

<svelte:head>
  <meta property="og:site_name" content={site.title} />
  <meta property="og:locale" content={site.lang} />
  {#if post}
    <meta property="og:type" content="article" />
    <meta property="og:url" content={site.protocol + site.domain + post.path} />
    <meta property="article:author" content={site.author.name} />
    <meta property="article:published_time" content={post.published ?? post.created} />
    <meta property="article:modified_time" content={post.updated ?? post.published ?? post.created} />
    {#if post.layout === 'article'}
      <meta property="og:title" content={post.title ?? post.path.slice(1)} />
      <meta property="og:url" content={site.protocol + site.domain + post.path} />
      {#if post.summary}
        <meta property="og:description" content={post.summary} />
      {/if}
      {#if post.photo}
        <meta property="og:image" content={site.protocol + site.domain + post.photo} />
        <meta name="twitter:card" content="summary_large_image" />
      {:else}
        <meta property="og:image" content={icon.maskable512.src ?? icon.any512.src} />
        <meta name="twitter:card" content="summary" />
      {/if}
      {#if post.tags}
        {#each post.tags as tag}
          <meta property="article:tag" content={tag} />
        {/each}
      {/if}
    {:else if post.layout === 'note'}
      <meta property="og:title" content={post.path} />
    {/if}
  {:else}
    <meta property="og:type" content="website" />
    <meta property="og:image" content={icon.maskable512.src ?? icon.any512.src} />
    <meta property="og:description" content={site.description} />
    {#if page}
      <meta property="og:title" content={page.title ?? page.path.slice(1)} />
      <meta property="og:url" content={site.protocol + site.domain + page.path} />
    {:else}
      <meta property="og:title" content={site.title} />
      <meta property="og:url" content={site.protocol + site.domain} />
    {/if}
  {/if}
  {#if site.author.twitter}
    <meta name="twitter:site" content={site.author.twitter} />
    <meta name="twitter:creator" content={site.author.twitter} />
  {/if}
</svelte:head>
