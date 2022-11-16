<script lang="ts">
  import { date } from '$lib/config/general'
  import { site } from '$lib/config/site'
  export let post: Urara.Post
  export let preview: boolean = false
  const stringPublished = new Date(post.published ?? post.created).toLocaleString(date.locales, date.options)
  const stringUpdated = new Date(post.updated ?? post.published ?? post.created).toLocaleString(date.locales, date.options)
  const jsonPublished = new Date(post.published ?? post.created).toJSON()
  const jsonUpdated = new Date(post.updated ?? post.published ?? post.created).toJSON()
</script>

<div class:md:mb-4={!preview && post.type !== 'article'} class="flex font-semibold gap-1.5">
  <a
    class:hidden={preview}
    rel="author"
    class="opacity-75 hover:opacity-100 hover:text-primary duration-500 ease-in-out p-author h-card"
    href={site.protocol + site.domain}>
    {site.author.name}
  </a>
  <span class:hidden={preview} class="opacity-50">/</span>
  <a href={post.path} class="u-url u-uid swap group/time">
    <time
      class="group-hover/time:opacity-0 font-semibold opacity-75 duration-500 ease-in-out mr-auto dt-published"
      datetime={jsonPublished}
      itemprop="datePublished">
      {stringPublished}
    </time>
    <time
      class="opacity-0 group-hover/time:opacity-100 font-semibold text-primary duration-500 ease-in-out mr-auto dt-updated"
      datetime={jsonUpdated}
      itemprop="dateModified">
      {stringUpdated}
    </time>
  </a>
</div>
