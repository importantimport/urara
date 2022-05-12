import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: 'https://',
  domain: (import.meta.env.URARA_SITE_DOMAIN as string) ?? 'urara-demo.netlify.app',
  title: 'Urara',
  subtitle: 'Sweet & Powerful SvelteKit Blog Template',
  lang: 'en-US',
  description: 'Powered by SvelteKit/Urara',
  author: {
    name: 'John Doe',
    photo: '/assets/maskable@192.png',
    status: '🌸',
    bio: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  themeColor: '#3D4451'
}
