<script lang="ts">
  import { dateConfig } from '$lib/config/date'
  import IconCalendar from '~icons/heroicons-outline/calendar'
  import IconPencilAlt from '~icons/heroicons-outline/pencil-alt'
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
      class="btn btn-sm bg-base-300/50 text-base-content/75 {currentPriority === 0
        ? '!hover:(btn-primary text-primary)'
        : '!hover:(btn-secondary text-secondary)'} bg-opacity-15 border-none !hover:bg-opacity-25 !transition-all ease-in-out !duration-200">
      <IconCalendar class="inline-block w-5 h-5 mr-2 {currentPriority === 0 ? '' : 'hidden'}" />
      <IconPencilAlt class="inline-block w-5 h-5 mr-2 {currentPriority === 0 ? 'hidden' : ''}" />
      <span class:hidden={currentPriority === 1}>{post.priority[0]}</span>
      <span class:hidden={currentPriority === 0}>{post.priority[1]}</span>
    </button>
  {/if}
  <button
    on:click={() => (currentDate === 'date' ? (currentDate = 'lastmod') : (currentDate = 'date'))}
    class="btn btn-sm bg-base-300/50 text-base-content/75 {currentDate === 'date'
      ? '!hover:(btn-primary text-primary)'
      : '!hover:(btn-secondary text-secondary)'} bg-opacity-15 border-none !hover:bg-opacity-25 !transition-all ease-in-out !duration-200">
    <IconCalendar class="inline-block w-5 h-5 mr-2 {currentDate === 'date' ? '' : 'hidden'}" />
    <IconPencilAlt class="inline-block w-5 h-5 mr-2 {currentDate === 'date' ? 'hidden' : ''}" />
    <time class:hidden={currentDate === 'lastmod'} datetime={jsonDate} itemprop="dateCreated">{stringDate}</time>
    <time class:hidden={currentDate === 'date'} datetime={jsonLastmod} itemprop="dateModified">{stringLastmod}</time>
  </button>
</div>
