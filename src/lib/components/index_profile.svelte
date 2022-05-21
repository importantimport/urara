<script lang="ts">
  import { site } from '$lib/config/site'
</script>

<div class="flex flex-row xl:flex-col gap-4 sticky top-24 card card-body items-right h-card">
  <a href={site.protocol + site.domain} class="hidden u-url" rel="me">{site.title}</a>
  {#if site.author.photo}
    <img class="hidden u-photo" src={site.author.photo} alt={site.author.name} decoding="async" loading="lazy" />
    <div class="flex-none avatar w-32 h-32 ml-auto my-auto justify-end">
      <img
        class="rounded-full shadow-xl hover:shadow-2xl transition-shadow w-32 h-32"
        src={site.author.photo}
        alt={site.author.name} />
      {#if site.author.status}
        <div class="absolute rounded-full w-10 h-10 bottom-0 right-0 bg-base-100 shadow-xl text-xl text-center py-1.5">
          {site.author.status}
        </div>
      {/if}
    </div>
  {/if}
  <div class="flex-1 text-right my-auto">
    <h2 class="text-3xl font-bold mt-0 mb-2 p-name">{site.author.name}</h2>
    <p class="opacity-75 p-note">{@html site.author.bio}</p>
    {#if site.author.pgp}
      <a href={site.author.pgp.link} rel="pgpkey" class="btn btn-ghost btn-xs bg-base-300 font-mono rounded-full mt-4">
        <span class="i-heroicons-solid-key !w-4 !h-4 mr-1" />
        {site.author.pgp.text}
      </a>
    {/if}
  </div>
</div>
