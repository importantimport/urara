<script lang="ts" context="module">
  import img from '$lib/components/prose/img.svelte'
  import code from '$lib/components/prose/code.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { img, code, table }
</script>

<script lang="ts">
  import Flex from '$lib/components/layout_flex.svelte'
  import Footer from '$lib/components/footer.svelte'
  export let title = undefined
  export let date = undefined
  export let lastmod = undefined
  export let priority = undefined
  export let tags = undefined
  export let cover = undefined
  export let descr = undefined
  export let path = undefined
  export let page = undefined
</script>

<Flex {title} {date} {lastmod} {priority} {tags} {cover} {descr} {path} {page}>
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
