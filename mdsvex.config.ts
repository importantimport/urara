// mdsvex config type
import type { MdsvexOptions } from 'mdsvex'

// rehype plugins
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

// urara remark plugins
import type { Node, Data } from 'unist'
import { statSync } from 'fs'
import { parse, join } from 'path'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import Slugger from 'github-slugger'
import remarkFFF from 'remark-fff'
import remarkFootnotes from 'remark-footnotes'

// highlighter
import { escapeSvelte } from 'mdsvex'
import { lex, parse as parseFence } from 'fenceparser'
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter } from 'shiki-twoslash'
type VALUE = { [key in string | number]: VALUE } | Array<VALUE> | string | boolean | number

const remarkUraraFm =
  () =>
  (tree: Node<Data>, { data, filename }: { data: { fm?: Record<string, unknown> }; filename?: string }) => {
    const filepath = filename ? filename.split('/src/routes')[1] : 'unknown'
    const { dir, name } = parse(filepath)
    if (!data.fm) data.fm = {}
    // Generate slug & path
    data.fm.slug = filepath
    data.fm.path = join(dir, `/${name}`.replace('/+page', '').replace('.svelte', ''))
    // Generate ToC
    if (data.fm.toc !== false) {
      const [slugs, toc]: [slugs: Slugger, toc: { depth: number; title: string; slug: string }[]] = [new Slugger(), []]
      visit(tree, 'heading', (node: { depth: number }) => {
        toc.push({
          depth: node.depth,
          title: toString(node),
          slug: slugs.slug(toString(node), false)
        })
      })
      if (toc.length > 0) data.fm.toc = toc
      else data.fm.toc = false
    }
  }

// Better type definitions needed
const remarkUraraSpoiler = () => (tree: Node<Data>) =>
  visit(tree, 'paragraph', (node: any) => {
    const { children } = node
    const text = children[0].value
    const re = /\|\|(.{1,}?)\|\|/g
    if (re.test(children[0].value)) {
      children[0].type = 'html'
      children[0].value = text.replace(re, (_match: unknown, p1: string) => `<span class="spoiler">${p1}</span>`)
    }
    return node
  })

const defineConfig = (config: MdsvexOptions) => config

export default defineConfig({
  extensions: ['.svelte.md', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  layout: {
    _: './src/lib/components/post_layout.svelte'
  },
  highlight: {
    highlighter: async (code, lang, meta) => {
      let fence: Record<string, VALUE> | null
      let twoslash: any
      try {
        fence = parseFence(lex([lang, meta].filter(Boolean).join(' ')))
      } catch (error) {
        throw new Error(`Could not parse the codefence for this code sample \n${code}`)
      }
      if (fence?.twoslash === true) twoslash = runTwoSlash(code, lang as string)
      return `{@html \`${escapeSvelte(
        renderCodeToHTML(
          code,
          lang as string,
          fence ?? {},
          { themeName: 'material-default' },
          await createShikiHighlighter({ theme: 'material-default' }),
          twoslash
        )
      )}\` }`
    }
  },
  remarkPlugins: [
    [
      remarkFFF as any,
      {
        presets: ['hugo'],
        target: 'mdsvex',
        autofill: {
          provider: 'fs',
          path: (path: string) => path.replace('/src/routes/', '/urara/')
        }
      }
    ],
    remarkUraraFm,
    remarkUraraSpoiler,
    [remarkFootnotes, { inlineNotes: true }]
  ],
  rehypePlugins: [
    rehypeSlug as any,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    [
      rehypeExternalLinks,
      {
        rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
        target: '_blank'
      }
    ]
  ]
})
