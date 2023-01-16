<script lang="ts">
  import { site } from '$lib/config/site'
</script>

<div
  class="h-card flex flex-col gap-4 sticky top-24 card card-body p-4 items-right xl:border-2 xl:py-8 border-base-content/10 xl:ml-auto xl:mr-8 xl:max-w-xs">
  <a href={site.protocol + site.domain} class="hidden u-url u-uid">{site.author.name}</a>
  <figure class="relative mx-auto group">
    {#if site.author.avatar}
      <img
        class="u-photo rounded-full shadow-xl hover:shadow-2xl transition-shadow z-10 w-24 h-24 md:w-32 md:h-32"
        src={site.author.avatar}
        alt={site.author.name} />
    {/if}
    {#if site.author.status}
      <div
        class="absolute z-20 rounded-full w-8 h-8 md:w-10 md:h-10 bottom-0 right-0 bg-base-100 shadow-xl text-lg md:text-xl text-center py-0.5 md:py-1.5">
        {site.author.status}
      </div>
    {/if}
  </figure>
  <div class="text-center flex flex-col gap-2">
    <h2 class="text-2xl font-bold mt-0 mb-2 p-name">{site.author.name}</h2>
    <p class="opacity-75 p-note">{@html site.author.bio}</p>
    {#if site.author.metadata}
      <div class="flex gap-1 flex-wrap justify-center">
        {#each site.author.metadata as { text, icon, link, rel }}
          {#if link}
            <a
              href={link}
              rel={rel ?? 'me noopener noreferrer external'}
              class:btn-square={!text}
              class="btn btn-sm btn-ghost normal-case gap-2 u-url"
              target="_blank">
              {#if icon}
                <span class="{icon} !w-5 !h-5">{icon}</span>
              {/if}
              {#if text}
                {text}
              {/if}
            </a>
          {:else}
            <button class:btn-square={!text} class="btn btn-sm btn-ghost normal-case gap-2">
              {#if icon}
                <span class="{icon} !w-5 !h-5">{icon}</span>
              {/if}
              {#if text}
                {text}
              {/if}
            </button>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>
