import preprocess from 'svelte-preprocess'
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
import mdsvexConfig from './mdsvex.config.js'
import postcss from './postcss.config.js'
import UnoCSS from 'unocss/vite'
import { extractorSvelte } from '@unocss/core'
import { presetIcons } from 'unocss'
import { VitePWA } from 'vite-plugin-pwa'
import { mdsvex } from 'mdsvex'

export default /** @type {import('@sveltejs/kit').Config} */ {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  kit: {
    adapter: Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY'].includes(key))
      ? adapterAuto()
      : process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: null
        }),
    csp: { mode: 'auto' },
    prerender: { default: true },
    vite: {
      mode: process.env.MODE || 'production',
      envPrefix: 'URARA_',
      css: { postcss },
      plugins: [
        UnoCSS({
          extractors: [extractorSvelte],
          presets: [
            presetIcons({
              customizations: {
                iconCustomizer: (_collection, _icon, props) => {
                  props.height = '1.5rem'
                  props.width = '1.5rem'
                  return props
                }
              }
            })
          ]
        }),
        VitePWA({
          srcDir: './build',
          outDir: './.svelte-kit/output/client',
          registerType: 'autoUpdate'
        })
      ]
    }
  }
}
