<script lang="ts">
  import { indexConfig, layoutConfig } from '$lib/config/date'
  export let post: Urara.Post = undefined
  export let date: Urara.Post['date'] = undefined
  export let lastmod: Urara.Post['lastmod'] = undefined
  export let priority: Urara.Post['priority'] = undefined
  export let type = undefined
  if (!post) post = { date, lastmod, priority }
  let config = type === 'index' ? indexConfig : layoutConfig
  const stringDate = new Date(post.date).toLocaleDateString(config.locales, config.options)
  const stringLastmod = post.lastmod ? new Date(post.lastmod).toLocaleDateString(config.locales, config.options) : stringDate
  if (post.priority && !Array.isArray(post.priority)) post.priority = [`${post.priority}`, post.priority]
</script>

<p class="font-semibold children:(transition-opacity ease-in-out duration-250) pb-2 mb-auto">
  {#if post.priority}
    <span class="hover:(opacity-50 sibling:opacity-100)">{post.priority[0]}</span>
    <span class="text-primary opacity-0">PRIORITY: {post.priority[1]}</span>
  {:else}
    <span class="hover:(opacity-50 sibling:opacity-100)">{stringDate}</span>
    <span class="text-primary opacity-0">LASTMOD: {stringLastmod}</span>
  {/if}
</p>
