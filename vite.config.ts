// vite define config
import { defineConfig } from 'vite'
// vite plugin
import UnoCSS from 'unocss/vite'
import { presetTagify, presetIcons } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import { imagetools } from 'vite-imagetools'
import { sveltekit as SvelteKit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
// postcss & tailwindcss
import TailwindCSS from 'tailwindcss'
import tailwindConfig from './tailwind.config'
// @ts-expect-error ts(7016)
import LightningCSS from 'postcss-lightningcss'

export default defineConfig({
  envPrefix: 'URARA_',
  build: {
    sourcemap: false,
    rollupOptions: {
      cache: false
    }
  },
  css: {
    postcss: {
      plugins: [TailwindCSS(tailwindConfig), LightningCSS()]
    }
  },
  plugins: [
    UnoCSS({
      content: { pipeline: { include: [/\.svelte$/, /\.md?$/, /\.ts$/] } },
      extractors: [extractorSvelte],
      presets: [
        presetTagify({
          extraProperties: (matched: string) => (matched.startsWith('i-') ? { display: 'inline-block' } : {})
        }),
        presetIcons({ scale: 1.5 })
      ]
    }),
    imagetools(),
    SvelteKit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      manifest: false,
      scope: '/',
      workbox: {
        globPatterns: ['posts.json', '**/*.{js,css,html,svg,ico,png,webp,avif}'],
        globIgnores: ['**/sw*', '**/workbox-*']
      }
    })
  ]
})
