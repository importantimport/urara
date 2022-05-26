<script lang="ts">
  import { projects as allProjects } from '$lib/config/projects'
  import Head from '$lib/components/head.svelte'
  import ProjectComponent from '$lib/components/extra/projects.svelte'

  let items: { id: string }[] = [...(allProjects as { id: string }[]), { id: 'footer' }]
</script>

<Head />

{#each items as item}
  <ProjectComponent {item} />
{/each}
