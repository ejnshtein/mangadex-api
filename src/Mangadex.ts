import { AgentOptions } from '../types/agent'
import { Agent, DefaultOptions } from './Agent'
import { CoverArtResolver } from './api'
import { AccountResolver } from './api/account'
import { AuthResolver } from './api/auth'
import { ChapterResolver } from './api/chapter'
import { GroupResolver } from './api/group'
import { MangaResolver } from './api/manga'
import { UserResolver } from './api/user'
import {
  LegacyType,
  MappingId,
  MappingIdResponse
} from '../types/data-types/legacy'

import { ApiResponse } from '../types/response'
import { ApiResponseError } from './lib/error'

export class Mangadex {
  private options: AgentOptions

  public agent: Agent

  public account: AccountResolver
  public auth: AuthResolver
  public chapter: ChapterResolver
  public coverArt: CoverArtResolver
  public group: GroupResolver
  public manga: MangaResolver
  public user: UserResolver

  public static readonly auth = AuthResolver
  public static readonly chapter = ChapterResolver
  public static readonly coverArt = CoverArtResolver
  public static readonly group = GroupResolver
  public static readonly manga = MangaResolver
  public static readonly user = UserResolver

  constructor(options: AgentOptions = {}) {
    this.options = Object.assign({}, DefaultOptions, options)

    this.agent = new Agent(this.options)

    const apiBaseOptions = {
      agent: this.agent,
      options: this.options
    }

    this.account = new AccountResolver(apiBaseOptions)

    this.auth = new AuthResolver(apiBaseOptions)

    this.chapter = new ChapterResolver(apiBaseOptions)

    this.coverArt = new CoverArtResolver(apiBaseOptions)

    this.group = new GroupResolver(apiBaseOptions)

    this.manga = new MangaResolver(apiBaseOptions)

    this.user = new UserResolver(apiBaseOptions)
  }

  static async convertLegacyId(
    ids: number[],
    type: LegacyType
  ): Promise<MappingIdResponse> {
    const { data: mappingId } = await Agent.call<
      ApiResponse<{ data: MappingId }>
    >(
      'legacy/mapping',
      {
        method: 'POST'
      },
      {
        type,
        ids
      }
    )

    if (mappingId.result === 'error') {
      throw new ApiResponseError(mappingId.errors[0])
    }

    return mappingId
  }

  // /**
  //  * Search manga on mangadex
  //  * @param query Search query
  //  * @param options Request options
  //  */
  // async search(
  //   query: string | SearchQuery,
  //   options: MRequestOptions<'text'> = {}
  // ): Promise<SearchResult> {
  //   const userQuery = getQuery(query)

  //   const headers = getSearchHeaders(query, this.agent.getCookie())

  //   const result = await this.agent.call(
  //     'search',
  //     deepmerge(options, {
  //       params: userQuery as Record<string, unknown>,
  //       headers
  //     })
  //   )

  //   return Scraper.parseSearch(result, this.options.host)
  // }

  // /**
  //  * Search manga on mangadex
  //  * @param query Search query
  //  * @param options Request options
  //  */
  // static async search(
  //   query: string | SearchQueryAnonymous,
  //   options: MRequestOptions<'text'> = {}
  // ): Promise<SearchResult> {
  //   const userQuery = getQuery(query)

  //   const result = await Agent.call(
  //     'search',
  //     deepmerge(options, {
  //       params: userQuery as Record<string, unknown>
  //     })
  //   )

  //   return Scraper.parseSearch(result.data, options.baseUrl)
  // }

  // /**
  //  * Quick search manga on mangadex
  //  * @param query Search query
  //  * @param options Request options
  //  */
  // async quickSearch(
  //   title: string,
  //   options: MRequestOptions<'text'> = {}
  // ): Promise<SearchResult> {
  //   const result = await this.agent.call(
  //     `quick_search/${encodeURIComponent(title)}`,
  //     options
  //   )
  //   return Scraper.parseSearch(result)
  // }

  // /**
  //  * Quick search manga on mangadex
  //  * @param query Search query
  //  * @param options Request options
  //  */
  // static async quickSearch(
  //   title: string,
  //   options: MRequestOptions<'text'> = {}
  // ): Promise<SearchResult> {
  //   const result = await Agent.call(
  //     `quick_search/${encodeURIComponent(title)}`,
  //     options
  //   )
  //   return Scraper.parseSearch(result.data)
  // }

  // /**
  //  * Get home page of mangadex
  //  * @param options Request options
  //  */
  // async getHome(options: MRequestOptions<'text'> = {}): Promise<MangadexHome> {
  //   const result = await this.agent.call('', options)

  //   return Scraper.parseHome(result, this.options.host)
  // }

  // /**
  //  * Get home page of mangadex
  //  * @param options Request options
  //  */
  // static async getHome(
  //   options: MRequestOptions<'text'> = {}
  // ): Promise<MangadexHome> {
  //   const result = await Agent.call('', options)

  //   return Scraper.parseHome(
  //     result.data,
  //     options.baseUrl || DefaultOptions.host
  //   )
  // }

  // async friendAdd(
  //   userId: number,
  //   options: MRequestOptions<'headers'> = {}
  // ): Promise<boolean> {
  //   await this.agent.callAjaxAction(
  //     {
  //       function: 'friend_add',
  //       id: userId
  //     },
  //     options
  //   )

  //   return true
  // }

  // async mangaFollow(
  //   mangaId: number,
  //   type: string,
  //   options: MRequestOptions<'headers'> = {}
  // ): Promise<boolean> {
  //   await this.agent.callAjaxAction(
  //     {
  //       function: 'manga_follow',
  //       id: mangaId,
  //       type
  //     },
  //     options
  //   )

  //   return true
  // }

  // async mangaUnfollow(
  //   mangaId: number,
  //   options: MRequestOptions<'headers'> = {}
  // ): Promise<boolean> {
  //   await this.agent.callAjaxAction(
  //     {
  //       function: 'manga_unfollow',
  //       id: mangaId,
  //       type: mangaId
  //     },
  //     options
  //   )

  //   return true
  // }

  // /**
  //  * Set manga view for search, featured section and e.t.c.
  //  * @param mode mode id: 0 - detailed, 1 - expanded list, 2 - simple list, 3 - grid
  //  * @param params request options
  //  */
  // async setMangaView(
  //   mode: number,
  //   options: MRequestOptions<'headers'> = {}
  // ): Promise<boolean> {
  //   await this.agent.callAjaxAction(
  //     {
  //       function: 'set_mangas_view',
  //       mode
  //     },
  //     options
  //   )

  //   return true
  // }

  /**
  //  * Get all follow types.
  //  * @param options Request options
  //  */
  // async getFollows(
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<FollowType[]> {
  //   const result = await this.agent.callApi<{ [x: string]: FollowType }>(
  //     'follows',
  //     options
  //   )

  //   return Composer.formatTypeMapToArray(result)
  // }

  // /**
  //  * Get all follow types.
  //  * @param options Request options
  //  */
  // static async getFollows(
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<FollowType[]> {
  //   const result = await Agent.callApi<{ [x: string]: FollowType }>(
  //     'follows',
  //     options
  //   )

  //   return Composer.formatTypeMapToArray(result)
  // }

  // /**
  //  * Get all manga relation types.
  //  * @param options Request options
  //  */
  // async getRelations(
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<Relation[]> {
  //   const result = await this.agent.callApi<{ [x: string]: Relation }>(
  //     'relations',
  //     options
  //   )

  //   return Composer.formatTypeMapToArray(result)
  // }

  // /**
  //  * Get all manga relation types.
  //  * @param options Request options
  //  */
  // static async getRelations(
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<Relation[]> {
  //   const result = await Agent.callApi<{ [x: string]: Relation }>(
  //     'relations',
  //     options
  //   )

  //   return Composer.formatTypeMapToArray(result)
  // }
}
