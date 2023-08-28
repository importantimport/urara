// rehype plugins
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

// urara remark plugins
import { parse, join } from 'node:path'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import Slugger from 'github-slugger'
import remarkFFF from 'remark-fff'
import remarkFootnotes from 'remark-footnotes'

// highlighter
import { escapeSvelte } from 'mdsvex'
import { lex, parse as parseFence } from 'fenceparser'
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter } from 'shiki-twoslash'

const remarkUraraFm =
  () =>
  (tree, { data, filename }) => {
    const filepath = filename ? filename.split('/src/routes')[1] : 'unknown'
    const { dir, name } = parse(filepath)
    if (!data.fm) data.fm = {}
    // Generate slug & path
    data.fm.slug = filepath
    data.fm.path = join(dir, `/${name}`.replace('/+page', '').replace('.svelte', ''))
    // Generate ToC
    if (data.fm.toc !== false) {
      const [slugs, toc] = [new Slugger(), []]
      visit(tree, 'heading', node => {
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

/** @type {import("mdsvex").MdsvexOptions} */
export default {
  extensions: ['.svelte.md', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  layout: {
    _: './src/lib/components/post_layout.svelte'
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
        renderCodeToHTML(
          code,
          lang,
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
      remarkFFF,
      {
        presets: [],
        target: 'mdsvex',
        autofill: {
          provider: 'fs',
          path: path => path.replace('/src/routes/', '/urara/')
        },
        strict: {
          media: {
            type: 'string',
            array: false
          }
        }
      }
    ],
    remarkUraraFm,
    remarkUraraSpoiler,
    [remarkFootnotes, { inlineNotes: true }]
  ],
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
