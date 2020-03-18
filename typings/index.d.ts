import * as md from './mangadex.d'
import * as request from './request.d'

export const Mangadex: MangadexConstructor

export interface Mangadex extends Composer {

  agent: Agent

  getManga (
    id: string | number,
    normalize?: Boolean,
    params?: request.RequestOptions
  ): Promise<md.Title>

  getChapter (
    id: string | number,
    normalize?: boolean,
    params?: request.RequestOptions
  ):Promise<md.Chapter>

  search (
    query?: SearchQuery,
    params?: request.RequestOptions
  ): Promise<md.SearchResult>

  quickSearch (
    title: string,
    params?: request.RequestOptions
  ): Promise<md.SearchResult>

  getUser (
    id: string | number,
    params?: request.RequestOptions
  ): Promise<md.MangadexUser>

  getGroup (
    id: string | number,
    params?: request.RequestOptions
  ): Promise<md.MangadexGroup>

  getHome (params?: request.RequestOptions): Promise<md.MangadexHome>

  getMe (params?: request.RequestOptions): Promise<md.MangadexUser>
}

export interface SearchQuery {

  /**
   * Manga title
   */
  title: String

  /**
   * Author
   */
  author: String

  /**
   * Artist
   */
  artist: String

  /**
   * Original Language
   */
  lang_id: md.OriginalLanguage

  /**
   * Demographic
   */
  demos: md.Demographic

  /**
   * Publication status
   */
  statuses: md.PublicationStatus

  /**
   * Tags
   */
  tags: md.Tags

  /**
   * Tag inclusion mode
   */
  tag_mode_inc_all: 'all' | 'any'

  /**
   * Tag exclusion mode
   */
  tag_mode_exc: 'all' | 'any'
}

export interface Composer {

  getGenres (genre: number | string): Array<{ id: number, label: string }>

  getMangaLinks (links: Map<string, string>): Array<{ title: string, url: string }>

  getStatus (status: number): string

  getLangName (landCode: string): string

}

export interface MangadexOptions {

  host?: string
  apiHost?: string
  getCredentials?: Promise | Function | Object

  /**
   * Default cache timeout for both manga and chapter data. (ms)
   */
  cacheTimeout?: number

  /**
   * Default cache timeout for manga data. (ms)
   */
  mangaCacheTimeout?: number

  /**
   * Default cache timeout for chapter data. (ms)
   */
  chapterCacheTimeout?: number

  /**
   * Set `true` if you want to use caching for manga data.
   */
  cacheMangaResult?: boolean

  /**
   * Set `true` if you want to use caching for chapter data.
   */
  cacheChapterResult?: boolean
  
  /**
   * If `true` will use shared manga in-memory store instead of Mangadex instance cache store. (Works with timeout **mangaCacheTimeout** option)
   */
  shareMangaCache?: boolean

  /**
   * If `true` will use shared chapter in-memory store instead of Mangadex instance cache store. (Works with timeout **chapterCacheTimeout** option)
   */
  shareChapterCache?: boolean
}

export interface MangadexConstructor {
  /**
   * Initialize new Mangadex app.
   */
  new (options?: MangadexOptions): Mangadex

  getManga (
    id: string | number,
    normalize?: Boolean,
    params?: request.RequestOptions
  ): Promise<md.Title>

  getChapter (
    id: string | number,
    normalize?: boolean,
    params?: request.RequestOptions
  ):Promise<md.Chapter>

  search (
    query?: SearchQuery,
    params?: request.RequestOptions
  ): Promise<md.SearchResult>

  quickSearch (
    title: string,
    params?: request.RequestOptions
  ): Promise<md.SearchResult>

  getUser (
    id: string | number,
    params?: request.RequestOptions
  ): Promise<md.MangadexUser>

  getGroup (
    id: string | number,
    params?: request.RequestOptions
  ): Promise<md.MangadexGroup>

  getHome (params?: request.RequestOptions): Promise<md.MangadexHome>
}

export interface Session {
  sessionId: string
  sessionExpiration: Date
  persistentId?: string
}

export interface AgentConstructor {
  new (options?: AgentOptions): Agent
  login (username: string, password: string, rememberMe?: boolean, options?: request.RequestOptions): Promise<Session>
  saveSession (path: string, session: Session): Promise<boolean>
  call (url: string, options?: request.RequestOptions): Promise<request.RequestResult>
  callApi (url: string, options?: request.RequestOptions): Promise<request.RequestResult>
}

export interface AgentOptions {
  host: string
  apiHost: string
  sessionId: string
  sessionExpiration: string
  persistantId: string
  hentai: number
  getCredentials: Promise | Function | Object
  loginCredentials: Promise | Function | Object
}

export interface Agent {
  setSession (id: string, expiration?: string): void
  setPersistent (token: string): void
  login (username: string, password: string, rememberMe?: boolean, options?: request.RequestOptions): Promise<boolean>
  loginWithSession (path: string): Promise<boolean>
  saveSession (path: string): Promise<boolean>
  checkLogin (): Promise<boolean>
  call (url: string, options?: request.RequestOptions): Promise<request.RequestResult>
  callApi (url: string, options?: request.RequestOptions): Promise<request.RequestResult>
}

export default Mangadex