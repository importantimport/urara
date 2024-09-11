<script lang='ts'>
  import type { UtterancesConfig } from '$lib/types/post'

  import { onMount } from 'svelte'

  export let config: UtterancesConfig

  onMount(() => {
    const utterances = document.createElement('script')
    Object.entries({
      'async': '',
      'crossorigin': 'anonymous',
      'issue-term': 'pathname',
      'label': config.label ?? '',
      'repo': config.repo,
      'src': config.src ?? 'https://utteranc.es/client.js',
      'theme': config.theme ?? 'preferred-color-scheme',
    }).forEach(([key, value]) => utterances.setAttribute(key, value))
    setTimeout(() => {
      const observer = new MutationObserver(() => {
        document.getElementById('utterances-loading')!.remove()
        observer.disconnect()
      })
      observer.observe(document.getElementById('utterances')!, {
        childList: true,
      })
      document.getElementById('utterances-container')!.appendChild(utterances)
    }, 1000)
  })
</script>

<div id='utterances-container'>
  <button class='btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading' id='utterances-loading' />
  <div class='utterances' id='utterances' />
</div>
