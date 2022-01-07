<script lang="ts" context="module">
  export const load = ({ error, status }) => ({
    props: {
      status: status,
      message: error.message
    }
  })
</script>

<script lang="ts">
  import Card from '$lib/components/layout_card.svelte'
  import IconHome from '~icons/heroicons-outline/home'
  export let status: string
  export let message: string
  console.error(status, message)
</script>

<Card>
  <h1 class="opacity-15 !text-12xl !<md:text-6xl !-mt-2">
    {status}
  </h1>
  <h2 class="-mt-24 <md:-mt-12">{message}</h2>
  <div>
    <a href="/" class="btn btn-neutral !text-neutral-content shadow-xl hover:shadow-2xl mt-8">
      <IconHome class="inline-block w-6 h-6 -ml-1 mr-2" />
      Back to Home
    </a>
  </div>
</Card>
