<script lang="ts">
  import { fly } from 'svelte/transition'
  export let count = undefined
</script>

{#each { length: (count ??= 1) } as _, index}
  <div
    out:fly={{ x: index % 2 ? -100 : 100, duration: 200 }}
    class="card lg:card-side bg-base-100 shadow-xl <md:rounded-none mb-8">
    <div class="card-body">
      <div class="card-title bg-base-300 animate-pulse rounded h-9" />
      <div class="bg-base-300 animate-pulse rounded h-6 w-24 mb-2" />
      <div class="bg-base-300 animate-pulse rounded h-5 mb-1" />
      <div class="bg-base-300 animate-pulse rounded h-5 max-w-screen-sm mb-auto" />
      <div class="card-actions md:-mb-4 -ml-4">
        <button class="btn btn-link animate-pulse normal-case <sm:rounded-l-none m-0 pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24">
            <path stroke="current cap-round join-round width-2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="border-b-2 border-primary h-5 w-16" />
        </button>
      </div>
    </div>
  </div>
{/each}
