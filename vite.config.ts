// vite define config
import { defineConfig } from 'vite'
// vite sveltekit
import { sveltekit } from '@sveltejs/kit/vite'
// vite plugin
import UnoCSS from 'unocss/vite'
import { presetTagify, presetIcons, extractorSvelte } from 'unocss'
import { VitePWA } from 'vite-plugin-pwa'
// postcss & tailwindcss
import TailwindCSS from 'tailwindcss'
import tailwindConfig from './tailwind.config'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default defineConfig({
  mode: process.env.MODE || 'production',
  envPrefix: 'URARA_',
  css: {
    postcss: {
      plugins: [
        TailwindCSS(tailwindConfig as any) as any,
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
      mode: 'svelte-scoped',
      include: [/\.svelte$/, /\.md?$/, /\.ts$/],
      extractors: [extractorSvelte],
      presets: [
        presetTagify({
          extraProperties: (matched: string) => (matched.startsWith('i-') ? { display: 'inline-block' } : {})
        }),
        presetIcons({ scale: 1.5 })
      ]
    }),
    VitePWA({
      srcDir: './build',
      outDir: './.svelte-kit/output/client',
      registerType: 'autoUpdate',
      scope: '/',
      base: '/'
    }),
    sveltekit()
  ]
})
