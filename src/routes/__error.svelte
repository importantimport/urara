<script lang="ts" context="module">
  export const load = ({ url, error, status }) => ({
    props: {
      status,
      message: error.message,
      pathname: url.pathname
    }
  })
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Card from '$lib/components/layouts/_card.svelte'
  import IconHome from '~icons/heroicons-outline/home'
  export let status: string
  export let message: string
  export let pathname: string
  console.error(status, pathname, message)
</script>

<Head page={{ title: '404', path: pathname }} />

<Card>
  <h1 class="opacity-20 text-6xl md:text-[12rem] -mt-2 mb-0">
    {status}
  </h1>
  <h2 class="-mt-12 md:-mt-24">{message}</h2>
  <div class="card-actions">
    <a href="/" class="btn btn-neutral no-underline shadow-xl hover:shadow-2xl mt-8">
      <IconHome class="inline-block w-6 h-6 -ml-1 mr-2" />
      Back to Home
    </a>
  </div>
</Card>
