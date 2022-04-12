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
  <div slot="center" class="flex flex-col min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-8rem)]">
    <slot name="top" />
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="card bg-base-100 rounded-none md:rounded-box shadow-xl md:mb-8 z-10">
      <main itemprop="articleBody" class="card-body prose urara-prose">
        {#if $$slots.left || $$slots.right || $$slots.top || $$slots.bottom}
          <slot name="center" />
        {:else}
          <slot />
        {/if}
      </main>
    </article>
    <slot name="bottom" />
    <Footer sticky={true} class="flex-1 md:flex-initial" />
  </div>
</Flex>
