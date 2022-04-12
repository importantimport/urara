<script lang="ts">
  import IconReply from '~icons/heroicons-outline/reply'
  let className = ''
  export { className as class }
  export let replyTo: Urara.Post.Reply['replyTo']
</script>

<div class="flex flex-wrap gap-2 rounded-box outline outline-neutral/10 p-4 {className}">
  <span class="flex-none font-bold uppercase opacity-30">Reply to:&nbsp;</span>
  {#if Array.isArray(replyTo)}
    {#each replyTo as reply}
      <a
        href={reply}
        rel="noopener external"
        target="_blank"
        class="flex-none flex rounded-badge bg-base-200 hover:bg-base-300 transition-all gap-2 px-4 u-in-reply-to">
        <IconReply class="flex-none my-auto w-4 h-4" />
        {reply}
      </a>
    {/each}
  {:else}
    <a
      href={replyTo}
      rel="noopener external"
      target="_blank"
      class="ml-auto flex-none flex rounded-badge bg-base-200 hover:bg-base-300 transition-all gap-2 px-4 u-in-reply-to">
      <IconReply class="flex-none my-auto w-4 h-4" />
      {replyTo}
    </a>
  {/if}
</div>
