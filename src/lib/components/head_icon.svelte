<script lang="ts">
  import { icons } from '$lib/config/icons'
  import { validate } from '$lib/utils/src'
</script>

<svelte:head>
  {#if icons.favicon}
    <link rel="icon" href={icons.favicon.src} sizes={icons.favicon.sizes} type={icons.favicon.type} />
  {/if}
  {#if icons.any192}
    <link rel="icon" href={validate(icons.any192.src)} sizes={icons.any192.sizes} type={icons.any192.type} />
  {:else if icons.maskable192}
    <link rel="icon" href={validate(icons.maskable192.src)} sizes={icons.maskable192.sizes} type={icons.maskable192.type} />
  {/if}
  {#if icons.appleTouchIcon}
    <link
      rel="apple-touch-icon"
      href={validate(icons.appleTouchIcon.src)}
      sizes={icons.appleTouchIcon.sizes}
      type={icons.appleTouchIcon.type} />
  {/if}
</svelte:head>
