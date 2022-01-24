<script lang="ts">
  import { site } from '$lib/config/site'
  import { config as footerConfig } from '$lib/config/footer'
  let className = undefined
  export { className as class }
</script>

<footer
  id="footer"
  class="footer footer-center bg-base-300 text-base-content shadow-inner rounded-box <md:rounded-none p-8 {className ?? ''}">
  <div class="prose">
    <p>
      {#each Object.entries(footerConfig.nav) as [href, name], i}
        <a {href} rel="noopener external" target="_blank">{name}</a>
        {#if i < Object.keys(footerConfig.nav).length - 1}
          <span class="mr-1">·</span>
        {/if}
      {/each}
    </p>
    <p>
      Copyright © {site.since && site.since !== new Date().toJSON().substring(0, 4)
        ? `${site.since} - ${new Date().toJSON().substring(0, 4)}`
        : new Date().toJSON().substring(0, 4)}
      {site.author.name}
      <br />
      Powered by
      <a rel="noopener external" target="_blank" href="https://github.com/sveltejs/kit">SvelteKit</a>
      /
      <a rel="noopener external" target="_blank" href="https://github.com/pngwn/mdsvex">MDsveX</a>
      /
      <a rel="noopener external" target="_blank" class="urara-link" href="https://github.com/importantimport/urara">Urara</a>
    </p>
    {#if footerConfig.html}
      {@html footerConfig.html}
    {/if}
  </div>
</footer>
