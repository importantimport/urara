export type PostConfig = {
  bridgy?: {
    [kind: string]: ('fed' | 'mastodon' | 'flickr' | 'github' | 'twitter')[]
  }
  comment?: CommentConfig
}

export type CommentConfig = {
  use: string[]
  /** tab style for multiple comments, preview at https://daisyui.com/components/tab */
  style?: 'none' | 'bordered' | 'lifted' | 'boxed'
  /** Webmention.io config, more at https://github.com/aaronpk/webmention.io#api */
  webmention?: WebmentionConfig
  /** Giscus config, more at https://giscus.app */
  giscus?: GiscusConfig
  /** Utterances config, more at https://utteranc.es */
  utterances?: UtterancesConfig
  remark42?: Remark42Config
}

export type WebmentionConfig = {
  /** username you got when you signed up webmention.io. */
  username: string
  /** number of results per page. */
  perPage?: number
  /** sorting mechanism to return the list of mentions. */
  sortBy?: 'created' | 'updated' | 'published' | 'rsvp'
  /** control the ordering. */
  sortDir?: 'down' | 'up'
  /** find links of a specific type. */
  property?: ('in-reply-to' | 'like-of' | 'repost-of' | 'bookmark-of' | 'mention-of' | 'rsvp')[]
  /** URL array of a webmention you'd like to block. */
  blockList?: string[]
  /** show the form for sending the webmention. */
  form?: boolean
  /** show `or comment anonymously` label text. */
  commentParade?: boolean
}

export type GiscusConfig = {
  /** self-hosted giscus url. */
  src?: string
  /** a public GitHub repository. this repo is where the discussions will be linked to. */
  repo: string
  /** a public GitHub repository. this repo is where the discussions will be linked to. */
  repoID: string
  /** fill in here if only search for discussions in this category. */
  category?: string
  /** choose the discussion category where new discussions will be created. */
  categoryID: string
  /** the reactions for the discussion's main post will be shown before the comments. */
  reactionsEnabled?: boolean
  /** discussion metadata will be sent periodically to the parent window (the embedding page). */
  emitMetadata?: boolean
  /** the comment input box will be placed above the comments, so that users can leave a comment without scrolling to the bottom of the discussion. */
  inputPosition?: 'top' | 'bottom'
  /** choose a theme that matches your website. */
  theme?: string
  /** choose the language giscus will be displayed in. */
  lang?: string
  /** loading of the comments will be deferred until the user scrolls near the comments container. */
  loading?: 'lazy'
}

export type UtterancesConfig = {
  /** self-hosted utterances url. */
  src?: string
  /** choose the repository utterances will connect to. */
  repo: string
  /** choose the label that will be assigned to issues created by utterances. */
  label?: string
  /** choose an utterances theme that matches your blog. */
  theme?: string
}

export type Remark42Config = {
  /** hostname of Remark42 server, same as REMARK_URL in backend config, e.g. "https://demo.remark42.com" */
  host: string
  /** the SITE that you passed to Remark42 instance on start of backend. (default: remark) */
  site_id?: string
  /** url to the page with comments*/
  url?: string
  /** an array of widgets that should be rendered on a page (default: ['embed'] )*/
  components?: ['embed' | 'last-comments' | 'counter']
  /** maximum number of comments that is rendered on mobile version (default: 15 )*/
  max_shown_comments?: number
  /** maximum number of comments in the last comments widget (default: 15 )*/
  max_last_comments?: number
  /** changes UI theme, (default: light )*/
  theme?: 'light' | 'dark'
  /** title for current comments page  (default: document.title)*/
  page_title?: string
  /**
   * interface localization,
   * English (en), Belarusian (be), Brazilian Portuguese (bp), Bulgarian (bg), Chinese (zh), Finnish (fi), French (fr), German (de), Japanese (ja), Korean (ko), Polish (pl), Russian (ru), Spanish (es), Turkish (tr), Ukrainian (ua), Italian (it) and Vietnamese (vi)
   * default: en
   */
  locale?: 'en' | 'be' | 'bp' | 'bg' | 'zh' | 'fi' | 'fr' | 'de' | 'ja' | 'ko' | 'pl' | 'ru' | 'es' | 'tr' | 'ua' | 'it' | 'vi'
  /** enables email subscription  (default: true) */
  show_email_subscription?: boolean
  /** enables RSS subscription, (default: true) */
  show_rss_subscription?: boolean
  /** minimized UI with basic info only, (default: false) */
  simple_view?: boolean
  /** hides footer with signature and links to Remark42,(default: false)  */
  no_footer?: boolean
}
