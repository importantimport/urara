<script lang="ts">
  import { site } from '$lib/config/site'
  import OpenGraph from '$lib/components/head_opengraph.svelte'
  export let post: Urara.Post = undefined
  export let page: Urara.Page = undefined
</script>

<svelte:head>
  {#if post}
    <link rel="canonical" href={site.protocol + site.domain + post.path} />
    {#if post.layout === 'article'}
      <title>{post.title ?? post.path.slice(1)} | {site.title}</title>
    {:else if post.layout === 'note'}
      <title>{post.path.slice(1)} | {site.title}</title>
    {/if}
    {#if post.tags}<meta name="keywords" content={post.tags.toString()} />{/if}
    {#if post.layout === 'article' && post.descr}<meta name="description" content={post.descr} />{/if}
  {:else}
    <meta name="description" content={site.descr} />
    {#if page}
      <title>{page.title ?? page.path.slice(1)} | {site.title}</title>
      <link rel="canonical" href={site.protocol + site.domain + page.path} />
    {:else}
      <title>{site.subtitle ? `${site.title} - ${site.subtitle}` : site.title}</title>
      <link rel="canonical" href={site.protocol + site.domain} />
    {/if}
  {/if}
</svelte:head>

<OpenGraph {post} {page} />
