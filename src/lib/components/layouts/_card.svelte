<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import Flex from '$lib/components/layouts/_flex.svelte'
  import Footer from '$lib/components/footer.svelte'
</script>

<Flex>
  <div slot="left" class="h-full">
    <slot name="left" />
  </div>
  <div slot="right" class="h-full">
    <slot name="right" />
  </div>
  <div slot="center">
    <slot name="top" />
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="card bg-base-100 rounded-none md:rounded-box shadow-xl mb-8">
      <main itemprop="articleBody" class="card-body prose urara-prose">
        {#if $$slots.left || $$slots.right || $$slots.top || $$slots.bottom}
          <slot name="center" />
        {:else}
          <slot />
        {/if}
      </main>
    </article>
    <slot name="bottom" />
    <Footer />
  </div>
</Flex>
