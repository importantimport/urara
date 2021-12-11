<script lang="ts">
  import { site } from '$lib/config/site'
</script>

<div class="flex <xl:flex-row gap-4 sticky top-24 card card-body items-right">
  {#if site.author.avatar}
    <div class="flex-0 avatar w-32 h-32 ml-auto my-auto justify-end">
      <div class="rounded-full urara-card-shadow w-32 h-32">
        <img src={site.author.avatar} alt={site.author.name} />
      </div>
      {#if site.author.status}
        <div class="absolute rounded-full w-10 h-10 bottom-0 right-0 bg-base-100 shadow-xl text-xl text-center py-1.5">
          {site.author.status}
        </div>
      {/if}
    </div>
  {/if}
  <div class="flex-1 text-right my-auto">
    <h2 class="card-title text-3xl mt-0">{site.author.name}</h2>
    {#if site.author.bioBefore}
      {@html site.author.bioBefore}
    {/if}
    <p class="opacity-75">{@html site.author.bio}</p>
    {#if site.author.bioAfter}
      {@html site.author.bioAfter}
    {/if}
  </div>
</div>
