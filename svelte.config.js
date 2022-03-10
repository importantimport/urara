import preprocess from 'svelte-preprocess'
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import { mdsvexConfig } from './mdsvex.config.js'
import Icons from 'unplugin-icons/vite'

export default /** @type {import('@sveltejs/kit').Config} */ {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      postcss: {
        plugins: true
      }
    })
  ],
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
    vite: {
      mode: process.env.MODE || 'production',
      envPrefix: 'URARA_',
      plugins: [
        Icons({
          autoInstall: true,
          compiler: 'svelte',
          defaultClass: 'inline-block w-6 h-6'
        })
      ]
    }
  }
}
