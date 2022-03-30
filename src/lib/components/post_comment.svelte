<script lang="ts">
  import { onMount } from 'svelte'
  import { comment as commentConfig } from '$lib/config/comment'
  import { toSnake } from '$lib/utils/case'
  export let post: Urara.Post = undefined
  const comments = import.meta.globEager('/src/lib/components/comments/*.svelte')
  let currentComment: string = undefined
  onMount(() => (currentComment = localStorage.getItem('comment') ?? toSnake(commentConfig.use[0])))
  $: if (currentComment !== undefined) localStorage.setItem('comment', currentComment)
</script>

{#if commentConfig.use?.length > 0}
  <div
    id="post-comment"
    class="card bg-base-100 card-body md:shadow-xl md:hover:shadow-2xl transition-shadow rounded-none md:rounded-box mb-8">
    {#if commentConfig.use.length > 1}
      <div class="tabs w-full mb-8" class:tabs-boxed={commentConfig?.['style'] === 'boxed'}>
        {#each commentConfig.use as name}
          <span
            on:click={() => (currentComment = toSnake(name))}
            class="flex-1 tab transition-all"
            class:tab-bordered={commentConfig?.['style'] === 'bordered'}
            class:tab-lifted={commentConfig?.['style'] === 'lifted'}
            class:tab-active={currentComment === toSnake(name)}>
            {name}
          </span>
        {/each}
      </div>
    {/if}
    {#if currentComment}
      {#key currentComment}
        <svelte:component
          this={comments[`/src/lib/components/comments/${currentComment}.svelte`].default}
          {post}
          config={commentConfig?.[currentComment]} />
      {/key}
    {/if}
  </div>
{/if}
