interface Feed {
  limit: number
  hub?: string[]
}

export const feed: Feed = {
  limit: 0
}

export const mode: 'prod' | 'dev' = import.meta.env.PROD ? 'prod' : 'dev'
