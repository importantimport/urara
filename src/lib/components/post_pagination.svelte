<script lang="ts">
  import IconChevronLeft from '~icons/heroicons-outline/chevron-left'
  import IconChevronRight from '~icons/heroicons-outline/chevron-right'
  export let next: Urara.Post = undefined
  export let prev: Urara.Post = undefined
</script>

<nav
  class="card bg-base-100 md:shadow-xl md:hover:shadow-2xl transition-shadow flex flex-col md:flex-row flex-warp justify-evenly rounded-none md:rounded-box mb-8">
  {#if next}
    <a href={next.path} class="flex-1 card-body group">
      <IconChevronLeft class="h-6 w-6 opacity-50 group-hover:opacity-100 mr-auto mb-2" />
      <div
        class="card-title block text-left mb-0 transition-all ease-in-out underline decoration-3 decoration-transparent group-hover:decoration-primary">
        {next['title'] ?? next.path.slice(1)}
      </div>
    </a>
    {#if prev}
      <div class="flex-0 divider mx-4 md:divider-horizontal md:mx-0 md:my-4" />
    {/if}
  {/if}
  {#if prev}
    <a href={prev.path} class="flex-1 card-body group">
      <IconChevronRight class="w-6 h-6 opacity-50 group-hover:opacity-100 ml-auto mb-2" />
      <div
        class="card-title block text-right mb-0 transition-all ease-in-out underline decoration-3 decoration-transparent group-hover:decoration-primary">
        {prev['title'] ?? prev.path.slice(1)}
      </div>
    </a>
  {/if}
</nav>
