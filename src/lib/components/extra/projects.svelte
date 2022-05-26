<script lang="ts">
  import type { Project } from '$lib/config/projects'
  import Footer from '$lib/components/footer.svelte'
  export let item: unknown
  let project = item as unknown as Project
  let tags = project.tags
</script>

{#if project.id === 'footer'}
  <Footer rounded={true} class="max-w-4xl mx-auto p-4 md:p-8" />
{:else}
  <a
    id={project.id}
    href={project.link}
    class="card mx-auto max-w-4xl bg-base-100 shadow-xl transition-shadow mb-7 h-card u-url hover:shadow-2xl">
    <div class="absolute text-5xl font-bold opacity-5 rotate-6 leading-tight top-2 right-0">
      {project.feature}
    </div>
    <div class="card-body p-4">
      <div class="flex flex-col md:flex-row items-start gap-4">
        <div class="mb-auto  max-w-full shrink-0 md:max-w-xs">
          <img class="rounded-md" src={project.img} alt={project.description} />
        </div>
        <div class="card-title flex-1 flex-col items-start gap-4">
          <div>
            <h2 class="p-name text-left text-2xl mb-2">{project.name}</h2>
            <div class="mb-3 text-base font-normal">
              {#each tags as tag}
                <span class="btn btn-sm btn-ghost normal-case border-dotted border-base-content/20 border-2 my-1 mr-1">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
          <p class="text-left text-base font-normal opacity-70">
            {@html project.description}
          </p>
        </div>
      </div>
    </div>
  </a>
{/if}
