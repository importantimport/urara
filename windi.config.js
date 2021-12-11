import { defineConfig } from 'vite-plugin-windicss'
import { transform } from 'windicss/helpers'
import daisyColors from 'daisyui/colors/index.js'
import filters from 'windicss/plugin/filters'
import typography from 'windicss/plugin/typography'
import scrollSnap from 'windicss/plugin/scroll-snap'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      colors: {
        ...daisyColors
      }
    }
  },
  variants: {},
  plugins: [filters, typography, scrollSnap, transform('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'emerald', 'valentine', 'synthwave', 'halloween', 'aqua', 'dracula']
  }
})
