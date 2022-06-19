<script lang="ts">
  import { head } from '$lib/config/general'
  import { post } from '$lib/config/post'
  import Icon from '$lib/components/head_icon.svelte'
</script>

<svelte:head>
  {#if head.me}
    {#each head.me as href}
      <link rel="me" {href} />
    {/each}
  {/if}
  {#if post.comment?.webmention?.username}
    <link rel="webmention" href="https://webmention.io/{post.comment.webmention.username}/webmention" />
    <link rel="pingback" href="https://webmention.io/{post.comment.webmention.username}/xmlrpc" />
  {/if}
</svelte:head>

<Icon />
