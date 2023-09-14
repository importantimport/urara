// svelte adapter
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
// svelte preprocessor
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import { vitePreprocess } from '@sveltejs/kit/vite'

const adapter = {
  auto: adapterAuto(),
  node: adapterNode(),
  static: adapterStatic({
    pages: 'build',
    assets: 'build',
    fallback: undefined
  })
}

/** @type {import("@svletejs/kit".Config)} */
export default {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],
  kit: {
    adapter: 
      process.env.ADAPTER
        ? adapter[process.env.ADAPTER.toLowerCase()]
        : Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY', 'GITHUB_ACTION_REPOSITORY', 'SST'].includes(key))
          ? adapter['auto']
          : adapter['static'],
    prerender: {
      handleMissingId: 'warn'
    },
    csp: {
      mode: 'auto',
      directives: {
        'style-src': ['self', 'unsafe-inline', 'https://giscus.app']
      }
    }
  }
}
