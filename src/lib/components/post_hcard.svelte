<script lang="ts">
  import { site } from '$lib/config/site'
  export let post: Urara.Post
</script>

<div class="hidden h-card p-author">
  <img class="u-photo" src={site.author.avatar} alt={site.author.name} decoding="async" loading="lazy" />
  <a rel="author" class="p-name u-url" href={site.url}>{site.author.name}</a>
</div>
<a class="hidden u-url u-uid" href={site.url + post.path}>{site.url + post.path}</a>
