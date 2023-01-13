<script lang="ts">
  import { fly } from 'svelte/transition'
  export let path: string = ''
</script>

{#key path}
  <div
    class="bg-base-100 md:bg-base-200 min-h-screen pt-16 md:pb-8 lg:pb-16"
    in:fly={{ y: 100, duration: 300, delay: 300 }}
    out:fly={{ y: -100, duration: 300 }}>
    <slot />
  </div>
{/key}
