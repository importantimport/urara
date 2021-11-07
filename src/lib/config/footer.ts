interface footerConfig {
  nav?: { [href: string]: string }
  html?: string
}

export const config: footerConfig = {
  nav: {
    '/atom.xml': 'RSS',
    '/sitemap.xml': 'Sitemap'
  }
}
