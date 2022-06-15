import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

import type { TailwindConfig } from 'tailwindcss/tailwind-config'

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
  plugins: [typography, daisyui],
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
