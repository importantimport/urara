<script lang="ts">
  import { site } from '$lib/config/site'
  import { head } from '$lib/config/head'
  import { mode } from '$lib/config/misc'
  import Icon from '$lib/components/head_icon.svelte'
  import OpenGraph from '$lib/components/head_opengraph.svelte'
  import RelMeAuth from '$lib/components/head_relmeauth.svelte'
  export let post: Urara.Post = undefined
  export let page: Urara.Page = undefined
</script>

<svelte:head>
  {#if post?.path}
    <title>{post.title ?? post.path} | {site.title}</title>
    <link rel="canonical" href={site.url + post.path} />
    <meta name="description" content={post.descr ?? site.descr} />
    {#if post.tags}<meta name="keywords" content={post.tags.toString()} />{/if}
  {:else}
    {#if page?.path && page.path !== '/'}
      <title>{page?.title ?? page.path} | {site.title}</title>
    {:else}
      <title>{site.subtitle ? `${site.title} - ${site.subtitle}` : site.title}</title>
    {/if}
    <meta name="description" content={site.descr} />
    <link rel="canonical" href={site.url} />
  {/if}
  <slot />
  <script>
    if (!localStorage.getItem('theme') && window.matchMedia) {
      document.documentElement.setAttribute(
        'data-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      )
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      })
    }
  </script>
  {#each [...head.custom.common, ...(mode === 'prod' ? head.custom.prod : head.custom.dev)] as tag}
    {@html tag}
  {/each}
</svelte:head>

<Icon />
<OpenGraph {post} />
<RelMeAuth />
