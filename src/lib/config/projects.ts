export type Project = {
  id: string
  name?: string
  tags?: string[]
  feature?: string
  description?: string
  img?: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'urara',
    name: 'Urara',
    tags: ['Svelte', 'MDsevX', 'SvelteKit', 'unocss', 'daisyui'],
    feature: 'Blog',
    description: `🌸 Sweet, Powerful, IndieWeb-Compatible SvelteKit Blog Starter.<br> 甜蜜且强大的 SvelteKit 網誌模板
    `,
    img: '/projects/urara.png',
    link: 'https://urara-demo.netlify.app/'
  }
]
