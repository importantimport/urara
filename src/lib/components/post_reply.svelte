<script lang="ts">
  let className = ''
  export { className as class }
  export let inReplyTo: Urara.Post.Reply['inReplyTo']
</script>

<div class="flex flex-wrap gap-2 rounded-box outline outline-neutral/10 p-4 {className}">
  <span class="flex-none font-bold uppercase opacity-30">Reply to:&nbsp;</span>
  {#if Array.isArray(inReplyTo)}
    {#each inReplyTo as reply}
      <a
        href={reply}
        rel="noopener external"
        target="_blank"
        class="flex-none flex rounded-badge bg-base-200 hover:bg-base-300 transition-all gap-2 px-4 u-in-reply-to">
        <span class="i-heroicons-outline-reply my-auto !w-4 !h-4" />
        {reply}
      </a>
    {/each}
  {:else}
    <a
      href={inReplyTo}
      rel="noopener external"
      target="_blank"
      class="ml-auto flex-none flex rounded-badge bg-base-200 hover:bg-base-300 transition-all gap-2 px-4 u-in-reply-to">
      <span class="i-heroicons-outline-reply my-auto !w-4 !h-4" />
      {inReplyTo}
    </a>
  {/if}
</div>
