import preprocess from 'svelte-preprocess'
import adapterStatic from '@sveltejs/adapter-static'
import WindiCSS from 'vite-plugin-windicss'
import { mdsvex } from 'mdsvex'
import { mdsvexConfig } from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  kit: {
    adapter: adapterStatic({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    target: 'body',
    vite: {
      mode: process.env.MODE || 'development',
      envPrefix: 'URARA_',
      plugins: [
        WindiCSS({
          config: 'windi.config.js',
          transformCSS: 'pre',
          scan: {
            fileExtensions: ['svelte', 'svx', 'md', 'js', 'ts']
          }
        })
      ]
    }
  }
}

export default config
