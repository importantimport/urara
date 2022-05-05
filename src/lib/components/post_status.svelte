<script lang="ts">
  import { date } from '$lib/config/general'
  import { site } from '$lib/config/site'
  export let post: Urara.Post
  export let index: boolean = false
  export let photo: boolean = false
  export let featured: boolean = false

  const stringPublished = new Date(post.published ?? post.created).toLocaleString(
    date.toPublishedString.locales,
    date.toPublishedString.options
  )
  const stringUpdated = new Date(post.updated ?? post.published ?? post.created).toLocaleString(
    date.toUpdatedString.locales,
    date.toUpdatedString.options
  )
  const jsonPublished = new Date(post.published ?? post.created).toJSON()
  const jsonUpdated = new Date(post.updated ?? post.published ?? post.created).toJSON()
</script>

<div
  class:mb-8={!index && !post.flags?.includes('hidden-author')}
  class:mb-4={!index}
  class="flex flex-wrap justify-between gap-2">
  {#if !index && !post.flags?.includes('hidden-author')}
    <div class="badge badge-lg badge-ghost shrink-0 text-base-content/75 font-bold gap-1 pl-0 h-card p-author">
      <img
        class="inline-block w-6 h-6 rounded-badge u-photo mr-1"
        src={site.author.photo}
        alt={site.author.name}
        decoding="async"
        loading="lazy" />
      {#if post.layout === 'article' || 'note'}
        <span>{`${post.layout[0].toUpperCase() + post.layout.substring(1)} by`}</span>
      {/if}
      <a rel="author" class="hover:text-secondary p-name u-url" href={site.protocol + site.domain}>{site.author.name}</a>
    </div>
  {/if}
  <a
    href={post.path}
    class:ml-auto={!index}
    class="{photo
      ? 'text-neutral-content !bg-neutral/50 hover:!bg-neutral/80'
      : 'text-base-content/75 px-0 hover:underline'} {featured
      ? 'text-neutral-content/75'
      : ''} badge badge-lg badge-ghost text-left bg-transparent border-none font-bold tooltip tooltip-bottom u-url u-uid"
    data-tip="Updated: {stringUpdated}">
    {stringPublished}
    <time class="hidden dt-published" datetime={jsonPublished} itemprop="datePublished">
      {stringPublished}
    </time>
    <time class="hidden dt-updated" datetime={jsonUpdated} itemprop="dateModified">
      {stringUpdated}
    </time>
  </a>
</div>
