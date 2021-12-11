<script lang="ts">
  export let next = undefined
  export let prev = undefined
</script>

<nav class="card bg-base-100 urara-card-shadow flex flex-col md:flex-row flex-warp justify-evenly <md:rounded-none mb-8">
  {#if next && (!next.priority || (next.priority[1] ?? next.priority) > 0)}
    <a href={next.path} class="flex-1 card-body group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 stroke-current opacity-50 group-hover:(stroke-primary opacity-100) mr-auto mb-2"
        fill="none"
        viewBox="0 0 24 24">
        <path stroke="cap-round join-round width-2" d="M15 19l-7-7 7-7" />
      </svg>
      <div
        class="card-title text-left mb-0 transition-all ease-in-out underline underline-3 underline-transparent group-hover:underline-primary">
        {next.title ?? next.path}
      </div>
    </a>
    {#if prev && (!prev.priority || (prev.priority[1] ?? prev.priority) > 0)}
      <div class="flex-0 divider mx-4 md:(divider-vertical mx-0 my-4)" />
    {/if}
  {/if}
  {#if prev && (!prev.priority || (prev.priority[1] ?? prev.priority) > 0)}
    <a href={prev.path} class="flex-1 card-body group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 stroke-current opacity-50 group-hover:(stroke-primary opacity-100) ml-auto mb-2"
        fill="none"
        viewBox="0 0 24 24">
        <path stroke="cap-round join-round width-2" d="M9 5l7 7-7 7" />
      </svg>
      <div
        class="card-title text-right mb-0 transition-all ease-in-out underline underline-3 underline-transparent group-hover:underline-primary">
        {prev.title ?? prev.path}
      </div>
    </a>
  {/if}
</nav>
