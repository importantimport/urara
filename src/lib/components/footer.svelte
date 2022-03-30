<script lang="ts">
  import { site } from '$lib/config/site'
  import { footer as footerConfig } from '$lib/config/general'
  let className = undefined
  export { className as class }
</script>

<footer
  id="footer"
  class="footer footer-center bg-base-300 text-base-content shadow-inner rounded-none md:rounded-box p-8 {className ?? ''}">
  <div class="prose">
    <p>
      {#if footerConfig.nav}
        {#each footerConfig.nav as { text, link }, i}
          <a href={link} rel="noopener external" target="_blank">{text}</a>
          {#if i + 1 < footerConfig.nav.length}
            <span class="mr-1">·</span>
          {/if}
        {/each}
        <br />
      {/if}
      Copyright © {footerConfig.since && footerConfig.since !== new Date().toJSON().substring(0, 4)
        ? `${footerConfig.since} - ${new Date().toJSON().substring(0, 4)}`
        : new Date().toJSON().substring(0, 4)}
      {site.author.name}
      <br />
      Powered by
      <a
        rel="noopener external"
        target="_blank"
        class="tooltip tooltip-secondary hover:text-secondary"
        data-tip="🌸 [γ] - Based on SvelteKit / MDsveX 🌸"
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
