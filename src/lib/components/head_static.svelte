<script lang="ts">
  import { head } from '$lib/config/head'
  import { dev } from '$lib/config/site'
  import Icon from '$lib/components/head_icon.svelte'
  import RelMeAuth from '$lib/components/head_relmeauth.svelte'
</script>

<svelte:head>
  {#each [...head.custom.common, ...(dev ? head.custom.dev : head.custom.prod)] as tag}
    {@html tag}
  {/each}
</svelte:head>

<Icon />
<RelMeAuth />
