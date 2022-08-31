<script lang="ts">
  import { dev } from '$app/environment'
  import { head } from '$lib/config/general'
  import { site } from '$lib/config/site'
  import OpenGraph from '$lib/components/head_opengraph.svelte'
  export let post: Urara.Post | undefined = undefined
  export let page: Urara.Page | undefined = undefined
</script>

<svelte:head>
  <meta name="author" content={site.author?.name} />
  {#if post}
    <link rel="canonical" href={site.protocol + site.domain + post.path} />
    {#if post.type === 'article'}
      <title>{post.title} | {site.title}</title>
    {:else if post.type === 'note'}
      <title>{post.summary ?? post.path.slice(1)} | {site.title}</title>
    {/if}
    {#if post.tags}<meta name="keywords" content={post.tags.join(', ')} />{/if}
    {#if post.summary}<meta name="description" content={post.summary} />{/if}
  {:else}
    <meta name="description" content={site.description} />
    <meta name="keywords" content={site.keywords?.join(', ')} />
    {#if page}
      <title>{page.title ?? page.path.slice(1)} | {site.title}</title>
      <link rel="canonical" href={site.protocol + site.domain + page.path} />
    {:else}
      <title>{site.subtitle ? `${site.title} - ${site.subtitle}` : site.title}</title>
      <link rel="canonical" href={site.protocol + site.domain} />
    {/if}
  {/if}
  {#if head.custom}
    {#each head.custom({ dev, post, page }) as tag}
      {@html tag}
    {/each}
  {/if}
</svelte:head>

<OpenGraph {post} {page} />
