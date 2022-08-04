<script lang="ts">
  import { onMount } from 'svelte'
  import type { UtterancesConfig } from '$lib/types/post'
  export let config: UtterancesConfig

  onMount(() => {
    const utterances = document.createElement('script')
    Object.entries({
      src: config.src ?? 'https://utteranc.es/client.js',
      repo: config.repo,
      'issue-term': 'pathname',
      label: config.label ?? '',
      theme: config.theme ?? 'preferred-color-scheme',
      crossorigin: 'anonymous',
      async: ''
    }).forEach(([key, value]) => utterances.setAttribute(key, value))
    setTimeout(() => {
      const observer = new MutationObserver(() => {
        document.getElementById('utterances-loading')!.remove()
        observer.disconnect()
      })
      observer.observe(document.getElementById('utterances')!, {
        childList: true
      })
      document.getElementById('utterances-container')!.appendChild(utterances)
    }, 1000)
  })
</script>

<div id="utterances-container">
  <button id="utterances-loading" class="btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading" />
  <div id="utterances" class="utterances" />
</div>
