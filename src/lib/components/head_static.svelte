<script lang='ts'>
  import Icon from '$lib/components/head_icon.svelte'
  import { head } from '$lib/config/general'
  import { post } from '$lib/config/post'
</script>

<svelte:head>
  {#if head.me}
    {#each head.me as href}
      <link {href} rel='me' />
    {/each}
  {/if}
  {#if post.comment?.webmention?.username}
    <link href='https://webmention.io/{post.comment.webmention.username}/webmention' rel='webmention' />
    <link href='https://webmention.io/{post.comment.webmention.username}/xmlrpc' rel='pingback' />
  {/if}
</svelte:head>

<Icon />
