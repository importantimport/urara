<script lang="ts">
  import { site } from '$lib/config/site'
  import { config as footerConfig } from '$lib/config/footer'
  let className = undefined
  export { className as class }
</script>

<footer
  id="footer"
  class="footer footer-center bg-base-300 text-base-content shadow-inner rounded-none md:rounded-box p-8 {className ?? ''}">
  <div class="prose">
    <p>
      {#each Object.entries(footerConfig.nav) as [href, name], i}
        <a {href} rel="noopener external" target="_blank">{name}</a>
        {#if i + 1 < Object.keys(footerConfig.nav).length}
          <span class="mr-1">·</span>
        {/if}
      {/each}
      <br />
      Copyright © {site.since && site.since !== new Date().toJSON().substring(0, 4)
        ? `${site.since} - ${new Date().toJSON().substring(0, 4)}`
        : new Date().toJSON().substring(0, 4)}
      {site.author.name}
      <br />
      Powered by
      <a
        rel="noopener external"
        target="_blank"
        class="tooltip tooltip-secondary hover:text-secondary"
        data-tip="🌸 Based on SvelteKit / MDsveX 🌸"
        href="https://github.com/importantimport/urara">
        Urara
      </a>
      {#if footerConfig.html}
        <br />
        {@html footerConfig.html}
      {/if}
    </p>
  </div>
</footer>
