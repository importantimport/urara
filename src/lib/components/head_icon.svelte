<script lang='ts'>
  import { any, favicon } from '$lib/config/icon'
</script>

<svelte:head>
  {#if favicon}
    <link href={favicon.src} rel='shortcut icon' sizes={favicon.sizes} type={favicon.type} />
  {/if}
  {#if any['180']}
    <link href={any['180'].src} rel='apple-touch-icon' sizes={any['180'].sizes} type={any['180'].type} />
  {/if}
  {#if any['192']}
    <link href={any['192'].src} rel='icon' sizes={any['192'].sizes} type={any['192'].type} />
  {/if}
</svelte:head>
