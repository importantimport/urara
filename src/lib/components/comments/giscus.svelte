<script lang="ts">
  import { onMount } from 'svelte'
  import { site } from '$lib/config/site'
  import type { GiscusConfig } from '$lib/types/post'
  export let config: GiscusConfig

  onMount(() => {
    const s = document.createElement('script')
    s.setAttribute('data-repo', config.repo)
    s.setAttribute('data-mapping', config.mapping ?? 'pathname')
    s.setAttribute('data-reactions-enabled', config.reactionsEnabled !== false ? '1' : '0')
    s.setAttribute('data-emit-metadata', config.emitMetadata === true ? '1' : '0')
    s.setAttribute('data-lang', config.lang ?? site.lang)
    s.setAttribute('crossorigin', 'anonymous')
    s.setAttribute('async', '')
    if (config.repoID) s.setAttribute('data-repo-id', config.repoID)
    if (config.category) s.setAttribute('data-category', config.category)
    if (config.categoryID) s.setAttribute('data-category-id', config.categoryID)
    if (config.theme) s.setAttribute('data-theme', config.theme)
    else s.setAttribute('data-theme', 'preferred_color_scheme')
    s.src = config.src ?? 'https://giscus.app/client.js'
    document.getElementById('giscus-container').appendChild(s)

    const observer = new MutationObserver(() => {
      document.getElementById('giscus-loading').remove()
      observer.disconnect()
    })

    observer.observe(document.getElementById('giscus'), {
      childList: true
    })
  })
</script>

<div id="giscus-container">
  <button id="giscus-loading" class="btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading" />
  <div id="giscus" class="giscus -mb-4" />
</div>
