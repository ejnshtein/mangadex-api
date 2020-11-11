import { MangadexOptions, MRequestOptions, SearchQuery } from '../types/agent'
import { MangadexHome, SearchResult } from '../types/mangadex'
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

  async getHome(options: MRequestOptions<'text'> = {}): Promise<MangadexHome> {
    const result = await this.agent.call('', options)

    return Scraper.parseHome(result, this.options.host)
  }

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
   * @param mode mode id: 0 - detailed
   * @param params request options
   */
  async setMangaView(
    mode: 0,
    options: MRequestOptions<'headers'>
  ): Promise<boolean>

  /**
   * Set manga view for search, featured section and e.t.c.
   * @param mode mode id: 1 - expanded list
   * @param params request options
   */
  async setMangaView(
    mode: 1,
    options: MRequestOptions<'headers'>
  ): Promise<boolean>

  /**
   * Set manga view for search, featured section and e.t.c.
   * @param mode mode id: 2 - simple list
   * @param params request options
   */
  async setMangaView(
    mode: 2,
    options: MRequestOptions<'headers'>
  ): Promise<boolean>

  /**
   * Set manga view for search, featured section and e.t.c.
   * @param mode mode id: 3 - grid
   * @param params request options
   */
  async setMangaView(
    mode: 3,
    options: MRequestOptions<'headers'>
  ): Promise<boolean>

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
}
