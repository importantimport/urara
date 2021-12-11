<script lang="ts">
  import { dateConfig } from '$lib/config/date'
  export let post: Urara.Post = undefined
  export let type: string
  if (post.priority && !Array.isArray(post.priority)) post.priority = [`${post.priority}`, post.priority]
  const config = dateConfig(type)
  const stringDate = new Date(post.date).toLocaleDateString(config.locales, config.options)
  const stringLastmod = post.lastmod ? new Date(post.lastmod).toLocaleDateString(config.locales, config.options) : stringDate
  const jsonDate = new Date(post.date).toJSON()
  const jsonLastmod = post.lastmod ? new Date(post.lastmod).toJSON() : jsonDate
  let currentDate: string = 'date'
  let currentPriority: number = 0
</script>

<div class="card-actions !mt-auto pt-6 gap-4 children:m-0">
  {#if post.priority}
    <button
      on:click={() => (currentPriority === 0 ? (currentPriority = 1) : (currentPriority = 0))}
      class="btn btn-sm normal-case bg-base-300/50 text-base-content/75 {currentPriority === 0
        ? '!hover:(btn-primary text-primary)'
        : '!hover:(btn-secondary text-secondary)'} bg-opacity-15 border-none !hover:bg-opacity-25 !transition-all ease-in-out !duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 mr-2 stroke-current fill-none"
        class:hidden={currentPriority === 1}>
        <path stroke="cap-round join-round width-2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 mr-2 stroke-current fill-none"
        class:hidden={currentPriority === 0}>
        <path stroke="cap-round join-round width-2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
      <span class:hidden={currentPriority === 1}>{post.priority[0]}</span>
      <span class:hidden={currentPriority === 0}>{post.priority[1]}</span>
    </button>
  {/if}
  <button
    on:click={() => (currentDate === 'date' ? (currentDate = 'lastmod') : (currentDate = 'date'))}
    class="btn btn-sm normal-case bg-base-300/50 text-base-content/75 {currentDate === 'date'
      ? '!hover:(btn-primary text-primary)'
      : '!hover:(btn-secondary text-secondary)'} bg-opacity-15 border-none !hover:bg-opacity-25 !transition-all ease-in-out !duration-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="inline-block w-5 h-5 mr-2 stroke-current fill-none"
      class:hidden={currentDate === 'lastmod'}>
      <path
        stroke="cap-round join-round width-2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="inline-block w-5 h-5 mr-2 stroke-current fill-none"
      class:hidden={currentDate === 'date'}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
    <time class:hidden={currentDate === 'lastmod'} datetime={jsonDate} itemprop="dateCreated">{stringDate}</time>
    <time class:hidden={currentDate === 'date'} datetime={jsonLastmod} itemprop="dateModified">{stringLastmod}</time>
  </button>
</div>
