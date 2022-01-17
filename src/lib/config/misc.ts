interface Feed {
  limit: number
  hub: string | boolean
}

export const feed: Feed = {
  limit: 0,
  hub: false
}

export const mode: 'prod' | 'dev' = import.meta.env.PROD ? 'prod' : 'dev'
