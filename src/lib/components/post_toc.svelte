<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  import Tree from '$lib/components/post_toc_tree.svelte'
  export let toc: Urara.PostToc[]
</script>

<nav aria-label="TableOfContent" class="sticky top-16 py-8">
  <Tree
    count={0}
    toc={toc.reduce(
      (acc, heading) => {
        let parent = acc
        while (parent.depth + 1 < heading.depth) parent = parent.children[parent.children.length - 1]
        parent.children = [...(parent.children ?? []), { ...heading, children: [] }]
        return acc
      },
      { depth: toc[0].depth - 1, children: [] }
    )} />
</nav>
