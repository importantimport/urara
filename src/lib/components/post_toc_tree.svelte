<script lang="ts">
  export let toc: Urara.PostToc
  const { title, slug, children } = toc
</script>

{#if title}
  <a
    on:click={() => document.getElementById(slug).scrollIntoView({ behavior: 'smooth' })}
    id={`toc-link-${slug}`}
    class="transition-all hover:!border-primary"
    href={'javascript:void(0)'}>
    {title}
  </a>
{/if}
{#if children.length > 0}
  <ul id={`toc-list-${slug ?? 'root'}`} class="menu">
    {#each children as child}
      <li id={`toc-item-${child.slug}`} class="hover-bordered">
        <svelte:self toc={child} />
      </li>
    {/each}
  </ul>
{/if}
