<script lang="ts">
  import { browser } from '$app/env'
  import { site } from '$lib/config/site'
  import { config as headerConfig } from '$lib/config/header'
  import IconLink from '~icons/heroicons-outline/link'
  import IconChevronUp from '~icons/heroicons-outline/chevron-up'
  import Theme from '$lib/components/header_theme.svelte'

  let pin: boolean
  let percent: number
  let [scrollY, lastY] = [0, 0]

  const checkY = (scrollY: number) => {
    const y = lastY - scrollY
    lastY = scrollY
    return y < 0 ? false : true
  }

  $: pin = checkY(scrollY)
  $: if (browser)
    percent =
      Math.round((scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 10000) / 100
</script>

<svelte:window bind:scrollY />

<header
  id="header"
  class="navbar fixed w-screen z-50 backdrop-filter backdrop-blur rounded-none transform-gpu transition-all ease-in-out {scrollY <
  32
    ? 'bg-transparent text-base-content'
    : 'bg-neutral/50 text-neutral-content shadow-xl'}"
  class:-translate-y-32={!pin}>
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-lg font-bold">
      {site.title}
    </a>
  </div>
  <div class="flex-none">
    {#if headerConfig.nav}
      <nav class="<lg:hidden">
        {#each Object.entries(headerConfig.nav) as [href, name]}
          <a {href} sveltekit:prefetch class="btn btn-ghost normal-case">{name}</a>
        {/each}
      </nav>
      <div class="lg:hidden dropdown dropdown-end">
        <div tabindex="0" class="btn btn-square btn-ghost">
          <IconLink />
        </div>
        <ul
          tabindex="0"
          class="p-2 shadow-2xl menu dropdown-content bg-base-100 text-base-content rounded-box w-52"
          class:hidden={pin === false}>
          {#each Object.entries(headerConfig.nav) as [href, name]}
            <li>
              <a {href}>{name}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    <Theme {pin} />
  </div>
</header>

<button
  id="totop"
  on:click={() => window.scrollTo(0, 0)}
  aria-label="scroll to top"
  class="btn btn-circle btn-lg fixed z-50 opacity-0 backdrop-filter backdrop-blur border-none shadow-lg bg-opacity-50 hover:bg-opacity-60 bottom-6 right-6 transform-gpu transition-all ease-in-out"
  class:opacity-100={scrollY}
  class:translate-y-24={!pin || scrollY === 0}>
  <svg class="h-16 w-16 fixed" stroke="accent width-3">
    <circle
      class="transform-gpu transition-transform origin-center -rotate-90 stroke-accent stroke-width-4 stroke-cap-round fill-transparent"
      r="30"
      cx="32"
      cy="32"
      stroke-dasharray={30 * 2 * Math.PI}
      stroke-dashoffset={30 * 2 * Math.PI - (percent / 100) * (30 * 2 * Math.PI)} />
  </svg>
  <IconChevronUp />
</button>
