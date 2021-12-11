<script lang="ts">
  import { browser } from '$app/env'
  import { themes } from '$lib/config/themes'
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

<div id="change-theme" class="dropdown lg:dropdown-hover dropdown-end">
  <div tabindex="0" class="btn btn-square btn-ghost">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-none" viewBox="0 0 24 24">
      <path
        stroke="current cap-round join-round width-2"
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  </div>
  <ul
    tabindex="0"
    class="p-2 shadow-2xl menu dropdown-content bg-base-100 text-base-content rounded-box w-52"
    class:hidden={pin === false}>
    {#each Object.entries(themes) as [theme, name]}
      <li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a href={'javascript:void(0)'} on:click={() => (currentTheme = theme)} class:active={currentTheme === theme}>
          {name}
        </a>
      </li>
    {/each}
  </ul>
</div>
