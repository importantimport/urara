interface Feed {
  limit: number
  hub: string | boolean
}

export const feed: Feed = {
  limit: 0,
  hub: false
}
