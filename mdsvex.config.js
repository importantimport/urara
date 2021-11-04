import shiki from 'shiki'
import remarkAbbr from 'remark-abbr'
import remarkSpoiler from 'remark-spoiler'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'

const highlighter = async (code, lang) => {
  if (lang === 'plain') lang = 'text'
  return `{@html \`${await shiki.getHighlighter({ theme: 'material-darker' }).then(highlighter =>
    highlighter
      .codeToHtml(code, lang)
      .replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
      .replace(/\\([trn])/g, '&#92;$1')
  )}\` }`
}

/** @type {Parameters<typeof import("mdsvex").mdsvex>[0]} */
export const mdsvexConfig = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: 'oldschool'
  },
  layout: {
    _: './src/lib/components/layout_post.svelte'
  },
  highlight: {
    highlighter
  },
  remarkPlugins: [remarkAbbr, remarkSpoiler],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeExternalLinks,
      {
        rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
        target: '_blank'
      }
    ]
  ]
}
