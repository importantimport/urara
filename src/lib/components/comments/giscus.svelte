<script lang='ts'>
  import type { GiscusConfig } from '$lib/types/post'

  import { site } from '$lib/config/site'
  import { onMount } from 'svelte'

  export let config: GiscusConfig

  onMount(() => {
    const giscus = document.createElement('script')
    Object.entries({
      'async': '',
      'crossorigin': 'anonymous',
      'data-category': config.category ?? '',
      'data-category-id': config.categoryID,
      'data-input-position': config.inputPosition ?? 'bottom',
      'data-lang': config.lang ?? site.lang ?? 'en',
      'data-loading': config.loading ?? '',
      'data-mapping': 'pathname',
      'data-reactions-enabled': config.reactionsEnabled === false ? '0' : '1',
      'data-repo': config.repo,
      'data-repo-id': config.repoID,
      'data-theme': config.theme ?? 'preferred_color_scheme',
      'src': config.src ?? 'https://giscus.app/client.js',
    }).forEach(([key, value]) => giscus.setAttribute(key, value))
    setTimeout(() => {
      const observer = new MutationObserver(() => {
        document.getElementById('giscus-loading')!.remove()
        observer.disconnect()
      })
      observer.observe(document.getElementById('giscus')!, {
        childList: true,
      })
      document.getElementById('giscus-container')!.appendChild(giscus)
    }, 1000)
  })
</script>

<div id='giscus-container'>
  <button class='btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading' id='giscus-loading' />
  <div class='giscus' id='giscus' />
</div>
