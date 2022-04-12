<script lang="ts">
  import Cover from '$lib/components/post_cover.svelte'
  import IconChevronLeft from '~icons/heroicons-outline/chevron-left'
  import IconChevronRight from '~icons/heroicons-outline/chevron-right'
  export let next: Urara.Post = undefined
  export let prev: Urara.Post = undefined
</script>

<nav class="flex flex-col md:flex-row flex-warp justify-evenly">
  {#if next}
    <div
      href={next.path}
      class:image-full={next['cover']}
      class:md:rounded-r-box={prev && !prev['cover']}
      class="flex-1 card group rounded-none before:!rounded-none">
      {#if next['cover']}
        <Cover
          figureClass="!block"
          imgClass="object-center h-full w-full absolute group-hover:scale-110 transition-transform duration-500 ease-in-out"
          cover={next['cover']} />
      {/if}
      <div class="card-body">
        <IconChevronLeft class="h-6 w-6 opacity-50 group-hover:opacity-100 mr-auto" />
        <a
          href={next.path}
          class="card-title block text-left mb-0 transition-all ease-in-out underline decoration-3 decoration-transparent group-hover:decoration-primary">
          {next['title'] ?? next.path.slice(1)}
        </a>
      </div>
    </div>
    {#if prev && !prev['cover'] && !next['cover']}
      <div class="flex-0 divider mx-4 md:divider-horizontal md:mx-0 md:my-4" />
    {/if}
  {/if}
  {#if prev}
    <div
      href={prev.path}
      class:image-full={prev['cover']}
      class:md:rounded-l-box={next && !next['cover']}
      class="flex-1 card group rounded-none before:!rounded-none">
      {#if prev['cover']}
        <Cover
          figureClass="!block"
          imgClass="object-center h-full w-full absolute group-hover:scale-110 transition-transform duration-500 ease-in-out"
          cover={prev['cover']} />
      {/if}
      <div class="card-body">
        <a
          href={prev.path}
          class="card-title block text-right mb-0 transition-all ease-in-out underline decoration-3 decoration-transparent group-hover:decoration-primary">
          {prev['title'] ?? prev.path.slice(1)}
        </a>
        <IconChevronRight class="w-6 h-6 opacity-50 group-hover:opacity-100 ml-auto" />
      </div>
    </div>
  {/if}
</nav>
