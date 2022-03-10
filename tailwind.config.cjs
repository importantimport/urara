const typography = require('@tailwindcss/typography')
const daisyui = require('daisyui')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{html,md,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'emerald', 'valentine', 'synthwave', 'halloween', 'aqua', 'dracula']
  }
}
