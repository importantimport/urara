interface Sites {
  title: string
  subtitle?: string
  lang?: string
  descr?: string
  author: {
    name: string
  } & {
    [key: string]: string
  }
  url: string
  themeColor?: string
  since?: string
}

export const site: Sites = {
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
