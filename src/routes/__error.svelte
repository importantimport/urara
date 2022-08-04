<script lang="ts" context="module">
  import type { Load } from './__types'
  export const load: Load = ({ url: { pathname }, error, status }) => ({ props: { pathname, error, status } })
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  export let pathname: string
  export let error: Error
  export let status: string
  console.error(status, error.message)
</script>

<Head page={{ title: status ?? '404', path: pathname ?? '/404' }} />

<div class="flex flex-col flex-nowrap justify-center xl:flex-row xl:flex-wrap">
  <div class="flex-none w-full max-w-screen-md mx-auto xl:mx-0">
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="card bg-base-100 rounded-none md:rounded-box shadow-xl md:mb-8 z-10">
      <main itemprop="articleBody" class="card-body prose urara-prose">
        <h1 class="opacity-20 text-6xl md:text-[12rem] -mt-2 mb-0">
          {status ?? '404'}
        </h1>
        <h2 class="-mt-12 md:-mt-24">{error.message ?? 'Not found'}</h2>
        <div class="card-actions">
          <a href="/" class="btn btn-neutral no-underline shadow-xl hover:shadow-2xl mt-8">
            <span class="i-heroicons-outline-home -ml-1 mr-2" />
            Back to Home
          </a>
        </div>
      </main>
    </article>
    <Footer sticky={true} class="flex-1 md:flex-initial" />
  </div>
</div>
