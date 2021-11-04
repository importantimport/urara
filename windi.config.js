import { defineConfig } from 'vite-plugin-windicss'
import { transform } from 'windicss/helpers'
import filters from 'windicss/plugin/filters'
import typography from 'windicss/plugin/typography'
import daisyColors from 'daisyui/colors/index.js'

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
  plugins: [filters, typography, transform('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'emerald', 'valentine', 'synthwave', 'halloween', 'aqua', 'dracula']
  }
})
