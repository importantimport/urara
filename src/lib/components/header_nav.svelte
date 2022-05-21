<script lang="ts">
  export let nav: { text: string; link?: string; children?: { text: string; link: string }[] }[]
  export let path: string
  export let pin: boolean
</script>

<div class="dropdown lg:hidden">
  <label for="navbar-dropdown" tabindex="0" class="btn btn-square btn-ghost">
    <span class="i-heroicons-outline-menu-alt-1" />
  </label>
  <ul
    id="navbar-dropdown"
    tabindex="0"
    class:hidden={!pin}
    class="menu menu-compact dropdown-content bg-base-100 text-base-content shadow-lg rounded-box max-w-52 p-2">
    {#each nav as { text, link, children }}
      {#if link && !children}
        <li>
          <a sveltekit:prefetch class:font-bold={link === path} href={link}>{text}</a>
        </li>
      {:else if children}
        <li tabindex="0">
          <span class:font-bold={children.some(({ link }) => link === path)} class="justify-between gap-1 max-w-[13rem]">
            {text}
            <span class="i-heroicons-solid-chevron-right mr-2" />
          </span>
          <ul class="bg-base-100 text-base-content shadow-lg p-2">
            {#each children as { text, link }}
              <li>
                <a sveltekit:prefetch class:font-bold={link === path} href={link}>{text}</a>
              </li>
            {/each}
          </ul>
        </li>
      {/if}
    {/each}
  </ul>
</div>
<ul class="menu menu-horizontal p-0 hidden lg:flex order-last">
  {#each nav as { text, link, children }}
    {#if link && !children}
      <li>
        <a sveltekit:prefetch class:font-bold={link === path} href={link}>{text}</a>
      </li>
    {:else if children}
      <li tabindex="0">
        <span class:font-bold={children.some(({ link }) => link === path)} class="gap-1">
          {text}
          <span class="i-heroicons-solid-chevron-down -mr-1" />
        </span>
        <ul class="bg-base-100 text-base-content shadow-lg p-2">
          {#each children as { text, link }}
            <li>
              <a sveltekit:prefetch class:font-bold={link === path} href={link}>{text}</a>
            </li>
          {/each}
        </ul>
      </li>
    {/if}
  {/each}
</ul>
