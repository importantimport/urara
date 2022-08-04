<script lang="ts">
  export let title: string | undefined = undefined
  export let description: string | undefined = undefined
  export let status: 'info' | 'success' | 'warning' | 'error' | undefined = undefined
</script>

<div
  class:alert-info={status === 'info'}
  class:alert-success={status === 'success'}
  class:alert-warning={status === 'warning'}
  class:alert-error={status === 'error'}
  class="alert flex-col shadow-inner my-4">
  <div class="mr-auto">
    {#if status === 'success'}
      <span class="i-heroicons-outline-check-circle" />
    {:else if status === 'warning'}
      <span class="i-heroicons-outline-exclamation-circle" />
    {:else if status === 'error'}
      <span class="i-heroicons-outline-x-circle" />
    {:else}
      <span class="i-heroicons-outline-information-circle" />
    {/if}
    <div>
      <div class:font-bold={description}>{title}</div>
      {#if description}
        <div class="text-xs">{description}</div>
      {/if}
    </div>
  </div>
  {#if $$slots.default}
    <div class="block w-full">
      <slot />
    </div>
  {/if}
</div>
