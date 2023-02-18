// sveltekit config type
import type { Config } from '@sveltejs/kit'
// svelte adapter
import adapterVercel from '@sveltejs/adapter-vercel'
import adapterNetlify from '@sveltejs/adapter-netlify'
import adapterStatic from '@sveltejs/adapter-static'
// svelte preprocessor
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import { vitePreprocess } from '@sveltejs/kit/vite'

const defineConfig = (config: Config) => config

export default defineConfig({
  extensions: ['.svelte', ...(mdsvexConfig.extensions as string[])],
  preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],
  kit: {
    adapter: Object.keys(process.env).some(key => key === 'VERCEL')
      ? adapterVercel()
      : Object.keys(process.env).some(key => key === 'NETLIFY')
      ? adapterNetlify({ edge: true })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: undefined
        }),
    prerender: {
      handleMissingId: 'warn'
    },
    csp: { mode: 'auto' }
  }
})
