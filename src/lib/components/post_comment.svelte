<script lang="ts">
  import type { CommentConfig } from '$lib/types/post'
  import { toSnake } from '$lib/utils/case'
  export let post: Urara.Post
  export let config: CommentConfig = undefined
  const comments = import.meta.globEager('/src/lib/components/comments/*.svelte')
  let currentComment: string = undefined
  currentComment = localStorage.getItem('comment') ?? toSnake(config.use[0])
</script>

{#if config?.use.length > 0}
  <div id="post-comment" class="card card-body">
    {#if config.use.length > 1}
      <div class="tabs w-full mb-8" class:tabs-boxed={config?.['style'] === 'boxed'}>
        {#each config.use as name}
          <span
            on:click={() => {
              currentComment = toSnake(name)
              localStorage.setItem('comment', toSnake(name))
            }}
            class="flex-1 tab transition-all"
            class:tab-bordered={config?.['style'] === 'bordered'}
            class:tab-lifted={config?.['style'] === 'lifted'}
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
          config={config?.[currentComment]} />
      {/key}
    {/if}
  </div>
{/if}
