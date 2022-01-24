interface Site {
  title: string
  subtitle?: string
  lang?: string
  descr?: string
  author: {
    name: string
    avatar: string
    status?: string
    bio?: string
    bioBefore?: string
    bioAfter?: string
    github?: string
    twitter?: string
    identica?: string
    pgp?: string[]
  }
  url: string
  themeColor?: string
  since?: string
}

export const site: Site = {
  title: 'Urara',
  subtitle: 'Sweet & Powerful SvelteKit Blog Template',
  lang: 'en-US',
  descr: 'Powered by SvelteKit/Urara',
  author: {
    name: 'John Doe',
    avatar: '/assets/maskable@512.png',
    status: '🌸',
    bio: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  url: (import.meta.env.URARA_SITE_URL as string) ?? 'https://example.com',
  themeColor: '#3D4451'
}
