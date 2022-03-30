<script lang="ts">
  import { icon } from '$lib/config/icon'
  import { site } from '$lib/config/site'
</script>

<svelte:head>
  {#if icon.favicon}
    <link rel="icon" href={icon.favicon.src} sizes={icon.favicon.sizes} type={icon.favicon.type} />
  {/if}
  {#if icon.any192}
    <link rel="icon" href={site.protocol + site.domain + icon.any192.src} sizes={icon.any192.sizes} type={icon.any192.type} />
  {:else if icon.maskable192}
    <link
      rel="icon"
      href={site.protocol + site.domain + icon.maskable192.src}
      sizes={icon.maskable192.sizes}
      type={icon.maskable192.type} />
  {/if}
  {#if icon.appleTouchIcon}
    <link
      rel="apple-touch-icon"
      href={site.protocol + site.domain + icon.appleTouchIcon.src}
      sizes={icon.appleTouchIcon.sizes}
      type={icon.appleTouchIcon.type} />
  {/if}
</svelte:head>
