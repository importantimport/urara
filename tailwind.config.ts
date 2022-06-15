// tailwind config type
import type { TailwindConfig } from 'tailwindcss/tailwind-config'
// @ts-ignore TS2305: Module 'tailwindcss/plugin' has no exported member 'TailwindPluginWithoutOptions'.
import type { TailwindPluginWithoutOptions } from 'tailwindcss/plugin'
// tailwind plugins
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

interface Config extends TailwindConfig {
  daisyui?: {
    styled?: boolean
    themes?: boolean | string[]
    base?: boolean
    utils?: boolean
    logs?: boolean
    rtl?: boolean
    darkTheme?: string
    prefix?: string
  }
}

const defineConfig = (config: Config) => config

export default defineConfig({
  content: ['./src/**/*.{html,md,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [typography as TailwindPluginWithoutOptions, daisyui as TailwindPluginWithoutOptions],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ]
  }
})
