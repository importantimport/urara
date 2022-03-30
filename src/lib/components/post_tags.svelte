<script lang="ts">
  export let tags: Urara.Post['tags']
</script>

<div>
  {#each tags as tag}
    <a href="/?tags={tag}" class="btn btn-sm btn-ghost normal-case mt-2 mr-2 p-category">
      #{tag}
    </a>
  {/each}
</div>
