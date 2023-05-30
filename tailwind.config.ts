import { theme } from './src/lib/config/general'
// @ts-ignore Could not find a declaration file for module '@tailwindcss/typography'.
import typography from '@tailwindcss/typography'
// @ts-ignore Could not find a declaration file for module 'daisyui'.
import daisyui from 'daisyui'

export default {
  content: ['./src/**/*.{html,md,js,svelte,ts}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'ul:has(li):has(input[type="checkbox"])': {
              padding: 0
            },
            'ul > li:has(input[type="checkbox"])': {
              listStyle: 'none'
            },
            'ul > li:has(input[type="checkbox"]) ul li': {
              paddingLeft: 30
            }
          }
        }
      }
    }
  },
  plugins: [typography, daisyui],
  daisyui: { themes: theme.map(({ name }) => name) }
}
