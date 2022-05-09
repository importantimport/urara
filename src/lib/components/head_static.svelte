<script lang="ts">
  import { post } from '$lib/config/post'
  import Icon from '$lib/components/head_icon.svelte'
  import RelMeAuth from '$lib/components/head_relmeauth.svelte'
</script>

<svelte:head>
  {#if post.comment?.webmention?.username}
    <link rel="webmention" href="https://webmention.io/{post.comment.webmention.username}/webmention" />
    <link rel="pingback" href="https://webmention.io/{post.comment.webmention.username}/xmlrpc" />
  {/if}
</svelte:head>

<Icon />
<RelMeAuth />
