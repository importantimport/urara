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
  export let status: string
  export let message: string
  console.error(status, message)
</script>

<Card>
  <h1 class="card-title !text-12xl !<md:text-6xl opacity-15">
    {status}
  </h1>
  <h2 class="-mt-24 <md:-mt-12">{message}</h2>
  <div>
    <a href="/" class="btn btn-neutral !text-neutral-content shadow-xl hover:shadow-2xl mt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Back to Home
    </a>
  </div>
</Card>
