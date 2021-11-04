interface headerConfig {
  nav?: {[href: string]: string}
  html?: string
}

export const config: headerConfig = {
  nav: {
    '/hello-world': 'Get Started',
    '/elements': 'Elements'
  }
}
