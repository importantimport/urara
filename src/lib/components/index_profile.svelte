<script lang="ts">
  import { site } from '$lib/config/site'
  import IconKey from '~icons/heroicons-solid/key'
</script>

<div class="flex <xl:flex-row gap-4 sticky top-24 card card-body items-right h-card">
  <a href={site.url} class="hidden u-url" rel="me">{site.title}</a>
  {#if site.author.avatar}
    <div class="flex-0 avatar w-32 h-32 ml-auto my-auto justify-end">
      <img class="rounded-full urara-card-shadow w-32 h-32 u-photo" src={site.author.avatar} alt={site.author.name} />
      {#if site.author.status}
        <div class="absolute rounded-full w-10 h-10 bottom-0 right-0 bg-base-100 shadow-xl text-xl text-center py-1.5">
          {site.author.status}
        </div>
      {/if}
    </div>
  {/if}
  <div class="flex-1 text-right my-auto">
    <h2 class="card-title text-3xl mt-0 p-name">{site.author.name}</h2>
    {#if site.author.bioBefore}
      {@html site.author.bioBefore}
    {/if}
    <p class="opacity-75 p-note">{@html site.author.bio}</p>
    {#if site.author.bioAfter}
      {@html site.author.bioAfter}
    {/if}
    {#if site.author.pgp}
      <a href={site.author.pgp[1]} rel="pgpkey" class="btn btn-ghost btn-xs bg-base-300 font-mono rounded-full mt-4">
        <IconKey class="inline-block w-4 h-4 mr-1" />
        {site.author.pgp[0]}
      </a>
    {/if}
  </div>
</div>
