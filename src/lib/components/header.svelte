<script lang="ts">
  import { browser, dev } from '$app/environment'
  import { fly } from 'svelte/transition'
  import { site } from '$lib/config/site'
  import { theme } from '$lib/config/general'
  import { title as storedTitle } from '$lib/stores/title'
  import { header as headerConfig } from '$lib/config/general'
  import { hslToHex } from '$lib/utils/color'
  import Nav from '$lib/components/header_nav.svelte'
  import Search from '$lib/components/header_search.svelte'
  export let path: string
  let title: string
  let currentTheme: string
  let currentThemeColor: string
  let search: boolean = false
  let pin: boolean = true
  let percent: number
  let [scrollY, lastY] = [0, 0]

  storedTitle.subscribe(storedTitle => (title = storedTitle as string))

  $: if (browser && currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme)
    currentThemeColor = hslToHex(
      ...(getComputedStyle(document.documentElement)
        .getPropertyValue('--b1')
        .slice(dev ? 1 : 0)
        .replaceAll('%', '')
        .split(' ')
        .map(Number) as [number, number, number])
    )
  }

  $: if (scrollY) {
    pin = lastY - scrollY > 0 || scrollY === 0 ? true : false
    lastY = scrollY
    if (browser)
      percent =
        Math.round((scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 10000) / 100
  }

  if (browser)
    currentTheme =
      localStorage.getItem('theme') ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? theme?.[1].name : theme[0].name ?? theme[0].name)
</script>

<svelte:head>
  <meta name="theme-color" content={currentThemeColor} />
</svelte:head>

<svelte:window bind:scrollY />

<header
  id="header"
  class:-translate-y-32={!pin && scrollY > 0}
  class="fixed z-50 w-full transition-all duration-500 ease-in-out border-b-2 border-transparent max-h-[4.125rem] {scrollY >
    32 && 'backdrop-blur !border-base-content/10 bg-base-100/30 md:bg-base-200/30'}">
  {#if !search}
    <div in:fly={{ x: -50, duration: 300, delay: 300 }} out:fly={{ x: -50, duration: 300 }} class="navbar">
      <div class="navbar-start">
        {#if headerConfig.nav}
          <Nav {path} {title} {pin} {scrollY} nav={headerConfig.nav} />
        {/if}
        <a href="/" class="btn btn-ghost normal-case text-lg">{site.title}</a>
      </div>
      <div class="navbar-end">
        {#if headerConfig.search}
          <button aria-label="search" on:click={() => (search = !search)} tabindex="0" class="btn btn-square btn-ghost">
            <span class="i-heroicons-outline-search" />
          </button>
        {/if}
        <div id="change-theme" class="dropdown dropdown-end">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <!-- reference: https://github.com/saadeghi/daisyui/issues/1285 -->
          <div tabindex="0" class="btn btn-square btn-ghost">
            <span class="i-heroicons-outline-color-swatch" />
          </div>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <!-- reference: https://github.com/saadeghi/daisyui/issues/1285 -->
          <ul
            tabindex="0"
            class="flex flex-nowrap shadow-2xl menu dropdown-content bg-base-100 text-base-content rounded-box w-52 p-2 gap-2 overflow-y-auto max-h-[21.5rem]"
            class:hidden={!pin}>
            {#each theme as { name, text }}
              <button
                data-theme={name}
                on:click={() => {
                  currentTheme = name
                  localStorage.setItem('theme', name)
                }}
                class:border-2={currentTheme === name}
                class:border-primary={currentTheme === name}
                class="btn btn-ghost w-full hover:bg-primary group rounded-lg flex bg-base-100 p-2 transition-all">
                <p class="flex-1 text-left text-base-content group-hover:text-primary-content transition-color">
                  {text ?? name}
                </p>
                <div class="grid grid-cols-4 gap-0.5 m-auto">
                  {#each ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-neutral'] as bg}
                    <div class={`${bg} w-1 h-4 rounded-btn`} />
                  {/each}
                </div>
              </button>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {:else}
    <div in:fly={{ x: 50, duration: 300, delay: 300 }} out:fly={{ x: 50, duration: 300 }} class="navbar">
      <Search />
      <button on:click={() => (search = !search)} tabindex="0" class="btn btn-square btn-ghost">
        <span class="i-heroicons-outline-x" />
      </button>
    </div>
  {/if}
</header>

<button
  id="totop"
  on:click={() => window.scrollTo(0, 0)}
  class:translate-y-24={!pin || scrollY === 0}
  aria-label="scroll to top"
  class="fixed grid group btn btn-circle btn-lg border-none backdrop-blur bottom-6 right-6 z-50 duration-500 ease-in-out {percent >
  95
    ? 'btn-accent shadow-lg'
    : 'btn-ghost bg-base-100/30 md:bg-base-200/30'}"
  class:opacity-100={scrollY}>
  <div
    class="radial-progress text-accent transition-all duration-500 ease-in-out group-hover:text-accent-focus col-start-1 row-start-1"
    style={`--size:4rem; --thickness: 0.25rem; --value:${percent};`} />
  <div
    class:border-transparent={percent > 95}
    class="border-4 border-base-content/10 group-hover:border-transparent col-start-1 row-start-1 rounded-full w-full h-full p-4 grid duration-500 ease-in-out">
    <span class="i-heroicons-solid-chevron-up !w-6 !h-6" />
  </div>
</button>
