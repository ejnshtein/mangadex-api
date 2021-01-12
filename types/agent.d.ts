import * as request from 'smol-request'

export interface Session {
  sessionId?: string
  sessionExpiration?: Date | string
  persistentId?: string
}

export interface LoginSession extends Session {
  sessionExpiration?: Date
}

export interface AgentOptions {
  host?: string
  apiHost?: string
  sessionId?: string
  sessionExpiration?: Date | string
  persistentId?: string
  hentai?: number
  getCredentials?: Session | (() => Promise<Session>) | (() => Session)
  loginCredentials?: Session | (() => Promise<Session>) | (() => Session)
}

export interface MRequestOptions<T = 'text'> extends request.RequestOptions<T> {
  baseUrl?: string
}

export interface SearchQuery {
  /**
   * Manga title
   */
  title?: string

  /**
   * Author
   */
  author?: string

  /**
   * Artist
   */
  artist?: string

  /**
   * Original Language
   */
  lang_id?: number

  /**
   * Demographic
   */
  demos?: number[]

  /**
   * Publication status
   */
  statuses?: number[]

  /**
   * Tags
   */
  tags?: number[]

  /**
   * Tag inclusion mode
   */
  tag_mode_inc_all?: 'all' | 'any'

  /**
   * Tag exclusion mode
   */
  tag_mode_exc?: 'all' | 'any'

  /**
   * Show hentai manga in search result
   */
  with_hentai?: boolean
}

export type SearchQueryAnonymous = Omit<SearchQuery, 'with_hentai'>

export type MangadexOptions = AgentOptions
