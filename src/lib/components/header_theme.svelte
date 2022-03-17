<script lang="ts">
  import { browser } from '$app/env'
  import { themes } from '$lib/config/themes'
  import IconColorSwatch from '~icons/heroicons-outline/color-swatch'
  export let pin: boolean
  let currentTheme: string, currentThemeColor: string

  const hex = (
    h: number,
    s: number,
    ll: number,
    l = (ll /= 100),
    a = (s * Math.min(l, 1 - l)) / 100,
    f = (n: number, k = (n + h / 30) % 12) =>
      Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
        .toString(16)
        .padStart(2, '0')
  ) => `#${f(0)}${f(8)}${f(4)}`

  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    currentThemeColor = setThemeColor()
  }

  const setThemeColor = () => {
    let [h, s, l] = getComputedStyle(document.documentElement)
      .getPropertyValue('--n')
      .slice(1)
      .replaceAll('%', '')
      .split(' ')
      .map(Number)
    return hex(h, s, l)
  }

  $: currentTheme ? changeTheme(currentTheme) : null

  if (browser) {
    if (localStorage.getItem('theme')) {
      currentTheme = localStorage.getItem('theme')
    } else {
      document.documentElement.setAttribute(
        'data-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      )
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      })
    }
    currentThemeColor = setThemeColor()
  }
</script>

<svelte:head>
  <meta name="theme-color" content={currentThemeColor} />
</svelte:head>

<div id="change-theme" class="dropdown dropdown-hover dropdown-end">
  <div tabindex="0" class="btn btn-square btn-ghost">
    <IconColorSwatch />
  </div>
  <ul
    tabindex="0"
    class="flex shadow-2xl menu dropdown-content bg-base-100 text-base-content rounded-box w-52 p-2 gap-2"
    class:hidden={pin === false}>
    {#each Object.entries(themes) as [theme, name]}
      <button
        data-theme={theme}
        on:click={() => (currentTheme = theme)}
        class="btn btn-ghost hover:bg-primary group rounded-lg flex bg-base-100 p-2 transition-all {currentTheme === theme
          ? 'border-[3px] border-primary'
          : ''}">
        <p class="flex-1 text-left text-base-content group-hover:text-primary-content transition-color">{name}</p>
        <div class="flex-0 m-auto flex gap-1">
          <div class="bg-primary w-2 h-2 rounded" />
          <div class="bg-secondary w-2 h-2 rounded" />
          <div class="bg-accent w-2 h-2 rounded" />
          <div class="bg-neutral w-2 h-2 rounded" />
        </div>
      </button>
    {/each}
  </ul>
</div>
