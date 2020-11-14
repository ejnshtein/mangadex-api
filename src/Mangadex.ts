import { MangadexOptions, MRequestOptions, SearchQuery } from '../types/agent'
import {
  FollowType,
  MangadexHome,
  Relations,
  SearchResult
} from '../types/mangadex'
import { Agent } from './Agent'
import { ChapterResolver } from './api/chapter'
import { GroupResolver } from './api/group'
import { MangaResolver } from './api/manga'
import { TagResolver } from './api/tag'
import { UserResolver } from './api/user'
import { deepmerge } from './lib/deepmerge'
import { getQuery } from './lib/get-query'
import { Scraper } from './Scraper'

const DefaultOptions = {
  host: 'https://mangadex.org',
  apiHost: 'https://mangadex.org/api/v2'
}

export class Mangadex {
  private options: MangadexOptions
  public agent: Agent
  public chapter: ChapterResolver
  public group: GroupResolver
  public manga: MangaResolver
  public tag: TagResolver
  public user: UserResolver

  constructor(options: MangadexOptions = {}) {
    this.options = Object.assign({}, DefaultOptions, options)

    this.agent = new Agent(this.options)

    const apiBaseOptions = {
      agent: this.agent,
      options: this.options
    }

    this.chapter = new ChapterResolver(apiBaseOptions)

    this.group = new GroupResolver(apiBaseOptions)

    this.manga = new MangaResolver(apiBaseOptions)

    this.tag = new TagResolver(apiBaseOptions)

    this.user = new UserResolver(apiBaseOptions)
  }

  /**
   * Search manga on mangadex
   * @param query Search query
   * @param options Request options
   */
  async search(
    query: SearchQuery | string,
    options: MRequestOptions<'text'> = {}
  ): Promise<SearchResult> {
    const userQuery = getQuery(query)

    const result = await this.agent.call(
      'search',
      deepmerge(options, {
        params: userQuery as Record<string, unknown>
      })
    )

    return Scraper.parseSearch(result, this.options.host)
  }

  /**
   * Search manga on mangadex
   * @param query Search query
   * @param options Request options
   */
  static async search(
    query: SearchQuery | string,
    options: MRequestOptions<'text'> = {}
  ): Promise<SearchResult> {
    const userQuery = getQuery(query)

    const result = await Agent.call(
      'search',
      deepmerge(options, {
        params: userQuery as Record<string, unknown>
      })
    )

    return Scraper.parseSearch(result.data, options.baseUrl)
  }

  /**
   * Quick search manga on mangadex
   * @param query Search query
   * @param options Request options
   */
  async quickSearch(
    title: string,
    options: MRequestOptions<'text'> = {}
  ): Promise<SearchResult> {
    const result = await this.agent.call(
      `quick_search/${encodeURIComponent(title)}`,
      options
    )
    return Scraper.parseSearch(result)
  }

  /**
   * Quick search manga on mangadex
   * @param query Search query
   * @param options Request options
   */
  static async quickSearch(
    title: string,
    options: MRequestOptions<'text'> = {}
  ): Promise<SearchResult> {
    const result = await Agent.call(
      `quick_search/${encodeURIComponent(title)}`,
      options
    )
    return Scraper.parseSearch(result.data)
  }

  /**
   * Get home page of mangadex
   * @param options Request options
   */
  async getHome(options: MRequestOptions<'text'> = {}): Promise<MangadexHome> {
    const result = await this.agent.call('', options)

    return Scraper.parseHome(result, this.options.host)
  }

  /**
   * Get home page of mangadex
   * @param options Request options
   */
  static async getHome(
    options: MRequestOptions<'text'> = {}
  ): Promise<MangadexHome> {
    const result = await Agent.call('', options)

    return Scraper.parseHome(
      result.data,
      options.baseUrl || DefaultOptions.host
    )
  }

  async friendAdd(
    userId: number,
    options: MRequestOptions<'headers'> = {}
  ): Promise<boolean> {
    await this.agent.callAjaxAction(
      {
        function: 'friend_add',
        id: userId
      },
      options
    )

    return true
  }

  async mangaFollow(
    mangaId: number,
    type: string,
    options: MRequestOptions<'headers'> = {}
  ): Promise<boolean> {
    await this.agent.callAjaxAction(
      {
        function: 'manga_follow',
        id: mangaId,
        type
      },
      options
    )

    return true
  }

  async mangaUnfollow(
    mangaId: number,
    options: MRequestOptions<'headers'> = {}
  ): Promise<boolean> {
    await this.agent.callAjaxAction(
      {
        function: 'manga_unfollow',
        id: mangaId,
        type: mangaId
      },
      options
    )

    return true
  }

  /**
   * Set manga view for search, featured section and e.t.c.
   * @param mode mode id: 0 - detailed, 1 - expanded list, 2 - simple list, 3 - grid
   * @param params request options
   */
  async setMangaView(
    mode: number,
    options: MRequestOptions<'headers'> = {}
  ): Promise<boolean> {
    await this.agent.callAjaxAction(
      {
        function: 'set_mangas_view',
        mode
      },
      options
    )

    return true
  }

  /**
   * Get all follow types.
   * @param options Request options
   */
  async getFollows(
    options: MRequestOptions<'json'> = {}
  ): Promise<FollowType[]> {
    return this.agent.callApi<FollowType[]>('follows', options)
  }

  /**
   * Get all follow types.
   * @param options Request options
   */
  static async getFollows(
    options: MRequestOptions<'json'> = {}
  ): Promise<FollowType[]> {
    return Agent.callApi<FollowType[]>('follows', options)
  }

  /**
   * Get all manga relation types.
   * @param options Request options
   */
  async getRelations(
    options: MRequestOptions<'json'> = {}
  ): Promise<Relations> {
    return this.agent.callApi<Relations>('relations', options)
  }
}
