export interface PostConfig {
  bridgy?: {
    [kind: string]: ('fed' | 'flickr' | 'github' | 'mastodon' | 'twitter')[]
  }
  comment?: CommentConfig
}

export interface CommentConfig {
  /** Giscus config, more at https://giscus.app */
  giscus?: GiscusConfig
  remark42?: Remark42Config
  /** tab style for multiple comments, preview at https://daisyui.com/components/tab */
  style?: 'bordered' | 'boxed' | 'lifted' | 'none'
  use: string[]
  /** Utterances config, more at https://utteranc.es */
  utterances?: UtterancesConfig
  /** Webmention.io config, more at https://github.com/aaronpk/webmention.io#api */
  webmention?: WebmentionConfig
}

export interface WebmentionConfig {
  /** URL array of a webmention you'd like to block. */
  blockList?: string[]
  /** show `or comment anonymously` label text. */
  commentParade?: boolean
  /** show the form for sending the webmention. */
  form?: boolean
  /** number of results per page. */
  perPage?: number
  /** find links of a specific type. */
  property?: ('bookmark-of' | 'in-reply-to' | 'like-of' | 'mention-of' | 'repost-of' | 'rsvp')[]
  /** sorting mechanism to return the list of mentions. */
  sortBy?: 'created' | 'published' | 'rsvp' | 'updated'
  /** control the ordering. */
  sortDir?: 'down' | 'up'
  /** username you got when you signed up webmention.io. */
  username: string
}

export interface GiscusConfig {
  /** fill in here if only search for discussions in this category. */
  category?: string
  /** choose the discussion category where new discussions will be created. */
  categoryID: string
  /** discussion metadata will be sent periodically to the parent window (the embedding page). */
  emitMetadata?: boolean
  /** the comment input box will be placed above the comments, so that users can leave a comment without scrolling to the bottom of the discussion. */
  inputPosition?: 'bottom' | 'top'
  /** choose the language giscus will be displayed in. */
  lang?: string
  /** loading of the comments will be deferred until the user scrolls near the comments container. */
  loading?: 'lazy'
  /** the reactions for the discussion's main post will be shown before the comments. */
  reactionsEnabled?: boolean
  /** a public GitHub repository. this repo is where the discussions will be linked to. */
  repo: string
  /** a public GitHub repository. this repo is where the discussions will be linked to. */
  repoID: string
  /** self-hosted giscus url. */
  src?: string
  /** choose a theme that matches your website. */
  theme?: string
}

export interface UtterancesConfig {
  /** choose the label that will be assigned to issues created by utterances. */
  label?: string
  /** choose the repository utterances will connect to. */
  repo: string
  /** self-hosted utterances url. */
  src?: string
  /** choose an utterances theme that matches your blog. */
  theme?: string
}

export interface Remark42Config {
  /** an array of widgets that should be rendered on a page (default: ['embed'] ) */
  components?: ['counter' | 'embed' | 'last-comments']
  /** hostname of Remark42 server, same as REMARK_URL in backend config, e.g. "https://demo.remark42.com" */
  host: string
  /**
   * interface localization,
   * English (en), Belarusian (be), Brazilian Portuguese (bp), Bulgarian (bg), Chinese (zh), Finnish (fi), French (fr), German (de), Japanese (ja), Korean (ko), Polish (pl), Russian (ru), Spanish (es), Turkish (tr), Ukrainian (ua), Italian (it) and Vietnamese (vi)
   * default: en
   */
  locale?: 'be' | 'bg' | 'bp' | 'de' | 'en' | 'es' | 'fi' | 'fr' | 'it' | 'ja' | 'ko' | 'pl' | 'ru' | 'tr' | 'ua' | 'vi' | 'zh'
  /** maximum number of comments in the last comments widget (default: 15 ) */
  max_last_comments?: number
  /** maximum number of comments that is rendered on mobile version (default: 15 ) */
  max_shown_comments?: number
  /** hides footer with signature and links to Remark42,(default: false)  */
  no_footer?: boolean
  /** title for current comments page  (default: document.title) */
  page_title?: string
  /** enables email subscription  (default: true) */
  show_email_subscription?: boolean
  /** enables RSS subscription, (default: true) */
  show_rss_subscription?: boolean
  /** minimized UI with basic info only, (default: false) */
  simple_view?: boolean
  /** the SITE that you passed to Remark42 instance on start of backend. (default: remark) */
  site_id?: string
  /** changes UI theme, (default: light ) */
  theme?: 'dark' | 'light'
  /** url to the page with comments */
  url?: string
}
