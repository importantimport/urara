<script lang="ts">
  import { site } from '$lib/config/site'
  import Icon from '$lib/components/head_icon.svelte'
  import OpenGraph from '$lib/components/head_opengraph.svelte'
  export let post: Urara.Post = undefined
</script>

<svelte:head>
  <meta name="theme-color" content={site.themeColor} />
  {#if post}
    <title>{post.title ? `${post.title} | ${site.title}` : site.title + ` - ${site.subtitle}` ?? ''}</title>
    <link rel="canonical" href={site.url + post.path} />
    <meta name="description" content={post.descr ?? site.descr} />
    {#if post.tags}<meta name="keywords" content={post.tags.toString()} />{/if}
  {:else}
    <title>{site.title}</title>
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
</svelte:head>

<Icon />
<OpenGraph {post} />
