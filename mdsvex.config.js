import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { escapeSvelte } from 'mdsvex'
import { lex, parse as parseFence } from 'fenceparser'
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter } from 'shiki-twoslash'
import { statSync } from 'fs'
import { parse, join } from 'path'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import Slugger from 'github-slugger'

const remarkUraraFm =
  () =>
  (tree, { data, filename }) => {
    const filepath = filename.split('/src/routes')[1]
    let { dir, name } = parse(filepath)
    if (!data.fm) data.fm = {}
    // Generate slug & path
    data.fm.slug = filepath
    data.fm.path = join(dir, `/${name}`.replace('/index', '').replace('.svelte', ''))
    // Auto-set layout as article
    if (!data.fm.layout) data.fm.layout = 'article'
    // Generate ToC
    if (data.fm.toc !== false) {
      let [slugs, toc] = [new Slugger(), []]
      visit(tree, 'heading', node => {
        toc.push({
          depth: node.depth,
          title: toString(node),
          slug: slugs.slug(toString(node))
        })
      })
      data.fm.toc = toc
    }
    // Rename {date, lastmod} to {created, updated}
    if (data.fm.date) data.fm.created = data.fm.date
    if (data.fm.lastmod) data.fm.updated = data.fm.lastmod
    // Auto-read created & updated
    if (!data.fm.created || !data.fm.updated) {
      const { ctime, mtime } = statSync(new URL(`./urara${filepath}`, import.meta.url))
      if (!data.fm.created) data.fm.created = ctime
      if (!data.fm.updated) data.fm.updated = mtime
    }
  }

const remarkUraraSpoiler = () => tree =>
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

export default /** @type {Parameters<typeof import("mdsvex").mdsvex>[0]} */ {
  extensions: ['.svelte.md', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  layout: {
    article: './src/lib/components/layouts/article.svelte',
    note: './src/lib/components/layouts/note.svelte',
    photo: './src/lib/components/layouts/photo.svelte',
    reply: './src/lib/components/layouts/reply.svelte',
    _flex: './src/lib/components/layouts/_flex.svelte',
    _card: './src/lib/components/layouts/_card.svelte',
    _post: './src/lib/components/layouts/_post.svelte',
    _: './src/lib/components/layouts/article.svelte'
  },
  highlight: {
    highlighter: async (code, lang, meta) => {
      let fence, twoslash
      try {
        fence = parseFence(lex([lang, meta].filter(Boolean).join(' ')))
      } catch (error) {
        throw new Error(`Could not parse the codefence for this code sample \n${code}`)
      }
      if (fence?.twoslash === true) twoslash = runTwoSlash(code, lang)
      return `{@html \`${escapeSvelte(
        renderCodeToHTML(code, lang, fence ?? {}, {}, await createShikiHighlighter({ theme: 'material-default' }), twoslash)
      )}\` }`
    }
  },
  remarkPlugins: [remarkUraraFm, remarkUraraSpoiler],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    [
      rehypeExternalLinks,
      {
        rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
        target: '_blank'
      }
    ]
  ]
}
