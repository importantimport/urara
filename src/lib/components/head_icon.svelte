<script lang="ts">
  import { favicon, any } from '$lib/config/icon'
</script>

<svelte:head>
  {#if favicon}
    <link rel="shortcut icon" href={favicon.src} sizes={favicon.sizes} type={favicon.type} />
  {/if}
  {#if any['180']}
    <link rel="apple-touch-icon" href={any['180'].src} sizes={any['180'].sizes} type={any['180'].type} />
  {/if}
  {#if any['192']}
    <link rel="icon" href={any['192'].src} sizes={any['192'].sizes} type={any['192'].type} />
  {/if}
</svelte:head>
