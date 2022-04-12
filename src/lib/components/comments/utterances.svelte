<script lang="ts">
  import { onMount } from 'svelte'
  import type { UtterancesConfig } from '$lib/types/post'
  export let config: UtterancesConfig
  onMount(() => {
    const s = document.createElement('script')
    s.setAttribute('repo', config.repo)
    s.setAttribute('theme', config.theme ?? 'preferred-color-scheme')
    s.setAttribute('crossorigin', 'anonymous')
    s.setAttribute('async', '')
    if (config.label) s.setAttribute('label', config.label)
    s.src = config.src ?? 'https://utteranc.es/client.js'
    document.getElementById('utterances').appendChild(s)

    const observer = new MutationObserver(() => {
      document.getElementById('utterances-loading').remove()
      observer.disconnect()
    })

    observer.observe(document.getElementById('utterances'), {
      childList: true
    })
  })
</script>

<div id="utterances-container">
  <button id="utterances-loading" class="btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading" />
  <div id="utterances" class="utterances" />
</div>
