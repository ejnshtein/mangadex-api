import * as md from './mangadex.d'
import * as request from './request.d'

export const Mangadex: MangadexConstructor

export interface Mangadex {

  agent: Agent

  getManga (
    id: number,
    params?: request.RequestOptions
  ): Promise<md.Manga>

  getChapter (
    id: number,
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
    id: number,
    params?: request.RequestOptions
  ): Promise<md.MangadexUser>

  getGroup (
    id: number,
    params?: request.RequestOptions
  ): Promise<md.MangadexGroup>

  getHome (params?: request.RequestOptions): Promise<md.MangadexHome>

  getMe (params?: request.RequestOptions): Promise<md.MangadexUser>

  getMangaFollows (params?: request.RequestOptions): Promise<md.MangaFollows[]>

  friendAdd (userId: number, params?: request.RequestOptions): Promise<Boolean>

  mangaFollow (mangaId: number, type: number, params?: request.RequestOptions): Promise<Boolean>

  mangaUnfollow (mangaId: number, type: number, params?: request.RequestOptions): Promise<Boolean>
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
}

export interface MangadexConstructor {
  /**
   * Initialize new Mangadex app.
   */
  new (options?: MangadexOptions): Mangadex

  getManga (
    id: number,
    params?: request.RequestOptions
  ): Promise<md.Manga>

  getChapter (
    id: number,
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
    id: number,
    params?: request.RequestOptions
  ): Promise<md.MangadexUser>

  getGroup (
    id: number,
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
  callAjaxAction (params: Record<string, string>, options?: request.RequestOptions): Promise<request.RequestResult>
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
  callAjaxAction (params: Record<string, string>, options?: request.RequestOptions): Promise<request.RequestResult>
}

export default Mangadex