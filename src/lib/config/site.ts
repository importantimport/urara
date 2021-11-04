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
  subtitle: 'Subtitle',
  lang: 'en-US',
  descr: 'Powered by SvelteKit/Urara',
  author: {
    name: 'John Doe',
    avatar: '',
    email: '',
    bio: ''
  },
  url: import.meta.env.URARA_SITE_URL ?? 'https://example.com',
  themeColor: '#3D4451'
}
