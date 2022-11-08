// vite define config
import { defineConfig } from 'vite'
// vite plugin
import UnoCSS from 'unocss/vite'
import { presetTagify, presetIcons, extractorSvelte } from 'unocss'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { sveltekit } from '@sveltejs/kit/vite'
// postcss & tailwindcss
import TailwindCSS from 'tailwindcss'
import tailwindConfig from './tailwind.config'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default defineConfig({
  envPrefix: 'URARA_',
  css: {
    postcss: {
      plugins: [
        TailwindCSS(tailwindConfig),
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production'
          ? [
              cssnano({
                preset: ['default', { discardComments: { removeAll: true } }]
              })
            ]
          : [])
      ]
    }
  },
  plugins: [
    UnoCSS({
      include: [/\.svelte$/, /\.md?$/, /\.ts$/],
      extractors: [extractorSvelte],
      presets: [
        presetTagify({
          extraProperties: (matched: string) => (matched.startsWith('i-') ? { display: 'inline-block' } : {})
        }),
        presetIcons({ scale: 1.5 })
      ]
    }),
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      manifest: false,
      scope: '/'
    })
  ]
})
