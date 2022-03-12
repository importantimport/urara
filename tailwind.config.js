import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

export default /** @type {import('tailwindcss/tailwind-config').TailwindConfig} */ {
  content: ['./src/**/*.{html,md,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'emerald', 'valentine', 'synthwave', 'halloween', 'aqua', 'dracula', 'winter']
  }
}
