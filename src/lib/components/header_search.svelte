<script lang='ts'>
  import { header as headerConfig } from '$lib/config/general'
  import { site } from '$lib/config/site'
</script>

<form
  action={headerConfig?.search?.provider === 'duckduckgo' ? '//duckduckgo.com/' : '//google.com/search'}
  class='flex-1'
  method='get'>
  <input
    class='input input-ghost input-bordered xl:bg-base-100 xl:text-base-content transition-all w-full h-12'
    name='q'
    type='text' />
  <input
    name={headerConfig?.search?.provider === 'duckduckgo' ? 'sites' : 'sitesearch'}
    type='hidden'
    value={site.protocol + site.domain} />
  <button class='btn btn-square btn-ghost ml-2' type='submit'>
    <span class='i-heroicons-outline-search' />
  </button>
</form>
