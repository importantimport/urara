import shiki from 'shiki'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import Slugger from 'github-slugger'

const highlighter = async (code, lang) => {
  if (lang === 'plain') lang = 'text'
  return `{@html \`${await shiki.getHighlighter({ theme: 'material-default' }).then(highlighter =>
    highlighter
      .codeToHtml(code, lang)
      .replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
      .replace(/\\([trn])/g, '&#92;$1')
  )}\` }`
}

const uraraToc = () => (tree, file) => {
  if (!file.data.fm) file.data.fm = {}
  if (file.data.fm?.toc === false) return
  const slugs = new Slugger()
  let toc = []
  visit(tree, 'heading', node => {
    toc.push({
      depth: node.depth,
      title: toString(node),
      slug: slugs.slug(toString(node))
    })
  })
  file.data.fm.toc = toc
}

const uraraSpoiler = () => tree => {
  visit(tree, 'paragraph', node => {
    const { children } = node
    const text = children[0].value
    const re = /\|\|(.{1,}?)\|\|/g
    if (re.test(children[0].value)) {
      children[0].type = 'html'
      children[0].value = text.replace(re, (_match, p1) => `<span class="spoiler">${p1}</span>`)
    }
    return node
  })
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
  remarkPlugins: [uraraToc, uraraSpoiler],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings,
    [
      rehypeExternalLinks,
      {
        rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
        target: '_blank'
      }
    ]
  ]
}
