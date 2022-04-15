import type { ThemeConfig, HeadConfig, HeaderConfig, FooterConfig, DateConfig, FeedConfig } from '$lib/types/general'

export const theme: ThemeConfig = [
  {
    name: 'light',
    text: '🌕 Light'
  },
  {
    name: 'dark',
    text: '🌑 Dark'
  },
  {
    name: 'cupcake',
    text: '🧁 Cupcake'
  },
  {
    name: 'emerald',
    text: '✳️ Emerald'
  },
  {
    name: 'valentine',
    text: '🌸 Valentine'
  },
  {
    name: 'synthwave',
    text: '🌃 Synthwave'
  },
  {
    name: 'halloween',
    text: '🎃 Halloween'
  },
  {
    name: 'aqua',
    text: '💦 Aqua'
  },
  {
    name: 'dracula',
    text: '🧛 Dracula'
  },
  {
    name: 'winter',
    text: '❄️ Winter'
  }
]

export const head: HeadConfig = {}

export const header: HeaderConfig = {
  nav: [
    {
      text: 'Get Started',
      link: '/hello-world'
    },
    {
      text: 'Elements',
      link: '/hello-world/elements'
    }
  ]
}

export const footer: FooterConfig = {
  nav: [
    {
      text: 'Feed',
      link: '/atom.xml'
    },
    {
      text: 'Sitemap',
      link: '/sitemap.xml'
    }
  ]
}

export const date: DateConfig = {
  toPublishedString: {
    locales: 'en-US',
    options: {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }
  },
  toUpdatedString: {
    locales: 'en-US',
    options: {
      year: '2-digit',
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    }
  }
}

export const feed: FeedConfig = {}
