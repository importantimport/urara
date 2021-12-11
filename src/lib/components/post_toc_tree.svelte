<script lang="ts">
  export let toc: Urara.PostToc
  export let count: number
  const { title, slug, children } = toc
  count += 1
</script>

{#if title}
  <a
    on:click={() => document.getElementById(slug).scrollIntoView({ behavior: 'smooth' })}
    class="transition-all hover:text-accent"
    href={'javascript:void(0)'}>
    {title}
  </a>
{/if}
{#if children}
  <ul class:pl-4={count > 1}>
    {#each children as child}
      <li>
        <svelte:self {count} toc={child} />
      </li>
    {/each}
  </ul>
{/if}
