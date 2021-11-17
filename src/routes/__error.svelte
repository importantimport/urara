<script lang="ts" context="module">
  export const load = ({ error, status }) => ({
    props: {
      status: status,
      message: error.message
    }
  })
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  export let status: string
  export let message: string
  console.log(status, message)
</script>

<Head />

<div class="px-4 lg:px-0 mx-auto w-full max-w-screen-md">
  <div class="card bg-base-100 shadow-xl mb-8">
    <div class="card-body <sm:p-4">
      <h1 class="card-title text-3xl">{status}</h1>
      <div class="prose">
        {message}
      </div>
    </div>
  </div>
  <Footer />
</div>
