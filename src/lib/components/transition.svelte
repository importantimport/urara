<script lang='ts'>
  import { fly } from 'svelte/transition'

  export let path: string = ''
</script>

{#key path}
  <div
    class='bg-base-100 md:bg-base-200 min-h-screen pt-16 md:pb-8 lg:pb-16'
    in:fly={{ delay: 300, duration: 300, y: 100 }}
    out:fly={{ duration: 300, y: -100 }}>
    <slot />
  </div>
{/key}
