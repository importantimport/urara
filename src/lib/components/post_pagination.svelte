<script lang='ts'>
  import Image from '$lib/components/prose/img.svelte'

  export let prev: undefined | Urara.Post
  export let next: undefined | Urara.Post
</script>

<nav class='flex flex-col md:flex-row flex-warp justify-evenly'>
  {#if prev}
    <div
      class='flex-1 card group rounded-none before:!rounded-none overflow-hidden'
      class:image-full={prev.image}
      class:md:rounded-r-box={next && !next.image}>
      {#if prev.image}
        <figure class='!block'>
          <Image
            alt={prev.alt ?? prev.image}
            class='object-center h-full w-full absolute group-hover:scale-105 transition-transform duration-500 ease-in-out'
            src={prev.image} />
        </figure>
      {/if}
      <div class='card-body'>
        <span class='i-heroicons-outline-chevron-left opacity-50 group-hover:opacity-100 mr-auto' />
        <a
          class='card-title block text-left mb-0 mr-auto bg-[length:100%_0%] bg-[position:0_88%] underline decoration-3 decoration-transparent group-hover:decoration-primary hover:bg-[length:100%_100%] hover:text-primary-content bg-gradient-to-t from-primary to-primary bg-no-repeat transition-all ease-in-out duration-300'
          href={prev.path}
          rel='prev'>
          {prev.title ?? prev.summary ?? prev.path.slice(1)}
        </a>
      </div>
    </div>
    {#if next && !next.image && !prev.image}
      <div class='flex-0 divider mx-4 md:divider-horizontal md:mx-0 md:my-4' />
    {/if}
  {/if}
  {#if next}
    <div
      class='flex-1 card group rounded-none before:!rounded-none overflow-hidden'
      class:image-full={next.image}
      class:md:rounded-l-box={prev && !prev.image}>
      {#if next.image}
        <figure class='!block'>
          <Image
            alt={next.alt ?? next.image}
            class='object-center h-full w-full absolute group-hover:scale-105 transition-transform duration-500 ease-in-out'
            src={next.image} />
        </figure>
      {/if}
      <div class='card-body'>
        <a
          class='card-title block text-right mb-0 ml-auto bg-[length:100%_0%] bg-[position:0_88%] underline decoration-3 decoration-transparent group-hover:decoration-primary hover:bg-[length:100%_100%] hover:text-primary-content bg-gradient-to-t from-primary to-primary bg-no-repeat transition-all ease-in-out duration-300'
          href={next.path}
          rel='next'>
          {next.title ?? next.summary ?? next.path.slice(1)}
        </a>
        <span class='i-heroicons-outline-chevron-right opacity-50 group-hover:opacity-100 ml-auto' />
      </div>
    </div>
  {/if}
</nav>
