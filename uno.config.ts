import extractorSvelte from '@unocss/extractor-svelte'
import { defineConfig, presetIcons, presetTagify } from 'unocss'

export default defineConfig({
  content: { pipeline: { include: [/\.svelte$/, /\.md?$/, /\.ts$/] } },
  extractors: [extractorSvelte],
  presets: [
    presetTagify({
      extraProperties: (matched: string) => (matched.startsWith('i-') ? { display: 'inline-block' } : {}),
    }),
    presetIcons({ scale: 1.5 }),
  ],
})
