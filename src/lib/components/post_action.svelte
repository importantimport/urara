<script lang="ts">
  export let post: Urara.Post
  const actions = import.meta.glob<{ default: unknown }>('/src/lib/components/actions/*.svelte', { eager: true })
</script>

<div class="sticky top-24 hidden xl:flex flex-col gap-4 w-fit h-[calc(100vh-12rem)] ml-auto mr-8 my-8 justify-center">
  {#if Object.keys(actions).length}
    {#each Object.values(actions) as action}
      <svelte:component this={action.default} {post} />
    {/each}
  {/if}
</div>
