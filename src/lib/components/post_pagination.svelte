<script lang="ts">
  import IconChevronLeft from '~icons/heroicons-outline/chevron-left'
  import IconChevronRight from '~icons/heroicons-outline/chevron-right'
  export let next = undefined
  export let prev = undefined
</script>

<nav
  class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row flex-warp justify-evenly rounded-none md:rounded-box mb-8">
  {#if next && (!next.priority || (next.priority[1] ?? next.priority) > 0)}
    <a href={next.path} class="flex-1 card-body group">
      <IconChevronLeft class="h-6 w-6 opacity-50 group-hover:opacity-100 mr-auto mb-2" />
      <div
        class="card-title text-left mb-0 transition-all ease-in-out underline decoration-3 decoration-transparent group-hover:decoration-primary">
        {next.title ?? next.path}
      </div>
    </a>
    {#if prev && (!prev.priority || (prev.priority[1] ?? prev.priority) > 0)}
      <div class="flex-0 divider mx-4 md:divider-vertical md:mx-0 md:my-4" />
    {/if}
  {/if}
  {#if prev && (!prev.priority || (prev.priority[1] ?? prev.priority) > 0)}
    <a href={prev.path} class="flex-1 card-body group">
      <IconChevronRight class="w-6 h-6 opacity-50 group-hover:opacity-100 ml-auto mb-2" />
      <div
        class="card-title text-right mb-0 transition-all ease-in-out underline decoration-3 decoration-transparent group-hover:decoration-primary">
        {prev.title ?? prev.path}
      </div>
    </a>
  {/if}
</nav>
