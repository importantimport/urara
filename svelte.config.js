import preprocess from 'svelte-preprocess'
import adapterAuto from '@sveltejs/adapter-auto'
import adapterStatic from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import { mdsvexConfig } from './mdsvex.config.js'
import Icons from 'unplugin-icons/vite'
import WindiCSS from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  kit: {
    adapter: Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY'].includes(key))
      ? adapterAuto()
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: null
        }),
    target: 'body',
    vite: {
      mode: process.env.MODE || 'production',
      envPrefix: 'URARA_',
      plugins: [
        Icons({
          autoInstall: true,
          compiler: 'svelte',
          defaultClass: 'inline-block w-6 h-6'
        }),
        WindiCSS({
          config: 'windi.config.js',
          transformCSS: 'pre',
          scan: {
            fileExtensions: ['svelte', 'md', 'js', 'ts']
          }
        })
      ]
    }
  }
}

export default config
