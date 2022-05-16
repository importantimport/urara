<script lang="ts">
  import IconInformationCircle from '~icons/heroicons-outline/information-circle'
  import IconCheckCircle from '~icons/heroicons-outline/check-circle'
  import IconExclamationCircle from '~icons/heroicons-outline/exclamation-circle'
  import IconXCircle from '~icons/heroicons-outline/x-circle'
  export let title: string = undefined
  export let description: string = undefined
  export let status: 'info' | 'success' | 'warning' | 'error' = undefined
</script>

<div
  class:alert-info={status === 'info'}
  class:alert-success={status === 'success'}
  class:alert-warning={status === 'warning'}
  class:alert-error={status === 'error'}
  class="alert flex-col shadow-inner my-4">
  <div class="mr-auto">
    {#if status === 'success'}
      <IconCheckCircle />
    {:else if status === 'warning'}
      <IconExclamationCircle />
    {:else if status === 'error'}
      <IconXCircle />
    {:else}
      <IconInformationCircle />
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
