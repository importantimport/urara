<script lang="ts">
  import Image from '$lib/components/prose/img.svelte'
  export let prev: Urara.Post = undefined
  export let next: Urara.Post = undefined
</script>

<nav class="flex flex-col md:flex-row flex-warp justify-evenly">
  {#if prev}
    <div
      href={prev.path}
      class:image-full={prev['photo']}
      class:md:rounded-r-box={next && !next['photo']}
      class="flex-1 card group rounded-none before:!rounded-none">
      {#if prev['photo']}
        <figure class="!block">
          <Image
            class="object-center h-full w-full absolute group-hover:scale-105 transition-transform duration-500 ease-in-out"
            src={prev['photo']} />
        </figure>
      {/if}
      <div class="card-body">
        <span class="i-heroicons-outline-chevron-left opacity-50 group-hover:opacity-100 mr-auto" />
        <a
          rel="prev"
          href={prev.path}
          class="card-title block text-left mb-0 mr-auto bg-[length:100%_0%] bg-[position:0_88%] underline decoration-3 decoration-transparent group-hover:decoration-primary hover:bg-[length:100%_100%] hover:text-primary-content bg-gradient-to-t from-primary to-primary bg-no-repeat transition-all ease-in-out duration-300">
          {prev['title'] ?? prev.path.slice(1)}
        </a>
      </div>
    </div>
    {#if next && !next['photo'] && !prev['photo']}
      <div class="flex-0 divider mx-4 md:divider-horizontal md:mx-0 md:my-4" />
    {/if}
  {/if}
  {#if next}
    <div
      href={next.path}
      class:image-full={next['photo']}
      class:md:rounded-l-box={prev && !prev['photo']}
      class="flex-1 card group rounded-none before:!rounded-none">
      {#if next['photo']}
        <figure class="!block">
          <Image
            class="object-center h-full w-full absolute group-hover:scale-105 transition-transform duration-500 ease-in-out"
            src={next['photo']} />
        </figure>
      {/if}
      <div class="card-body">
        <a
          rel="next"
          href={next.path}
          class="card-title block text-right mb-0 ml-auto bg-[length:100%_0%] bg-[position:0_88%] underline decoration-3 decoration-transparent group-hover:decoration-primary hover:bg-[length:100%_100%] hover:text-primary-content bg-gradient-to-t from-primary to-primary bg-no-repeat transition-all ease-in-out duration-300">
          {next['title'] ?? next.path.slice(1)}
        </a>
        <span class="i-heroicons-outline-chevron-right opacity-50 group-hover:opacity-100 ml-auto" />
      </div>
    </div>
  {/if}
</nav>
