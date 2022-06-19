// sveltekit config type
import type { Config } from '@sveltejs/kit'

// svelte preprocess
import preprocess from 'svelte-preprocess'
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

// vite plugin
import UnoCSS from 'unocss/vite'
import { presetTagify, presetIcons, extractorSvelte } from 'unocss'
import { VitePWA } from 'vite-plugin-pwa'

// postcss & tailwindcss
import TailwindCSS from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const defineConfig = (config: Config) => config

export default defineConfig({
  extensions: ['.svelte', ...(mdsvexConfig.extensions as string[])],
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  kit: {
    adapter: Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY'].includes(key))
      ? adapterAuto()
      : process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: undefined
        }),
    csp: { mode: 'auto' },
    prerender: { default: true },
    vite: {
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
        })
      ]
    }
  }
})
