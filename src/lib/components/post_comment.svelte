<script lang='ts'>
  import type { CommentConfig } from '$lib/types/post'

  import { toSnake } from '$lib/utils/case'

  export let post: Urara.Post
  export let config: CommentConfig
  const comments = import.meta.glob<any>('/src/lib/components/comments/*.svelte', { eager: true, import: 'default' })
  let currentComment: string | undefined
  let currentConfig: undefined | unknown
  currentComment = localStorage.getItem('comment') ?? toSnake(config.use[0])
  // @ts-ignore No index signature with a parameter of type 'string' was found on type 'CommentConfig'. ts(7053)
  $: if (currentComment)
    currentConfig = config[currentComment]
</script>

{#if config?.use.length > 0}
  <div class='card card-body' id='post-comment'>
    {#if config.use.length > 1}
      <div
        class='tabs w-full mb-8'
        class:tab-bordered={config?.style === 'bordered'}
        class:tab-lifted={config?.style === 'lifted'}
        class:tabs-boxed={config?.style === 'boxed'}>
        {#each config.use as name}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span
            class='flex-1 tab transition-all'
            class:tab-active={currentComment === toSnake(name)}
            on:click={() => {
              currentComment = toSnake(name)
              localStorage.setItem('comment', toSnake(name))
            }}>
            {name}
          </span>
        {/each}
      </div>
    {/if}
    {#if currentComment}
      {#key currentComment}
        <svelte:component
          config={currentConfig}
          {post}
          this={comments[`/src/lib/components/comments/${currentComment}.svelte`]} />
      {/key}
    {/if}
  </div>
{/if}
