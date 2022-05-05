<script lang="ts">
  export let toc: Urara.Post.Article.Toc
  const { title, slug, depth, children } = toc
</script>

{#if title}
  <span
    dir="ltr"
    on:click={() => document.getElementById(slug).scrollIntoView({ behavior: 'smooth' })}
    id={`toc-link-${slug}`}
    class="cursor-pointer border-l-4 border-transparent transition-all hover:border-primary hover:bg-base-content hover:bg-opacity-10 active:bg-primary active:text-primary-content active:font-bold pr-4 {depth <=
    2
      ? 'py-3'
      : 'py-2'}"
    class:pl-4={depth <= 2}
    class:pl-8={depth === 3}
    class:pl-12={depth === 4}
    class:pl-16={depth === 5}
    class:pl-20={depth === 6}>
    {title}
  </span>
{/if}
{#if children.length > 0}
  <ul dir="ltr" id={`toc-list-${slug ?? 'root'}`}>
    {#each children as child}
      <li id={`toc-item-${child.slug}`} class="flex flex-col">
        <svelte:self toc={child} />
      </li>
    {/each}
  </ul>
{/if}
