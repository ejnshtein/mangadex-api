import { Agent } from '../Agent'
import { ApiBase } from './base'
import { UserResolver } from './user'
import { CoverArtResolver } from './cover-art'
import {
  MangaExtended,
  MangaExtendedResponse,
  MangaFeedResponse,
  MangaResponse,
  MangaRatingContent,
  MangaList
} from '../../types/data-types/manga'
import { getRelationshipType } from '../lib/relationship-type'
import { CoverArtsResponse } from '../../types/data-types/cover-art'
import { Language } from '../../types/data-types/language'
import { ApiResponse } from '../../types/response'
import { MangaStatus } from '../../types/data-types/manga-status'
import { MangaPublicationDemographic } from '../../types/data-types/manga-publication-demographic'
import { formatQueryParams } from '../lib/format-query-params'
import { Tag } from '../../types/data-types/tag'

export type GetMangaFeedOptions = Partial<{
  limit: number
  offset: number
  translatedLanguage: Language[]
  createdAtSince: string
  updatedAtSince: string
  publishAtSince: string
  volume: string
  chapter: string
}>

export type TagsMode = 'AND' | 'OR'

export type SearchMangaOptions = Partial<{
  /**
   * @default 10
   */
  limit: number

  offset: number

  title: string

  authors: string[]
  artists: string[]

  /**
   * Year of release
   */
  year: number
  includedTags: string[]

  /**
   * @default 'AND'
   */
  includedTagsMode: TagsMode

  excludedTags: string[]

  /**
   * @default 'OR'
   */
  excludedTagsMode: TagsMode

  status: MangaStatus

  originalLanguage: Language[]

  publicationDemographic: MangaPublicationDemographic | 'none'

  /**
   * Manga ids (limited to 100 per request)
   */
  ids: string[]

  contentRating: (MangaRatingContent | 'none')[]

  /**
   * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   */
  createdAtSince: string

  /**
   * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   */
  updatedAtSince: string

  order: {
    createdAt: string
    updatedAt: string
  }
}>

export class MangaResolver extends ApiBase {
  async getManga(
    mangaId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, artist, author)
       */
      withRelationShips?: false
    }
  ): Promise<MangaResponse>

  async getManga(
    mangaId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, artist, author)
       */
      withRelationShips?: true
    }
  ): Promise<MangaExtendedResponse>

  /**
   * Get a manga
   * @param mangaId The manga ID
   * @param options Request options
   */
  async getManga(
    mangaId: string,
    options: {
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: manga } = await this.agent.call<MangaExtendedResponse>(
      `manga/${mangaId}`
    )

    if (manga.result === 'error') {
      return manga
    }

    const artists = getRelationshipType('artist', manga.relationships)
    const author = getRelationshipType('author', manga.relationships)[0]
    const coverArts = getRelationshipType('cover_art', manga.relationships)

    if (!options.withRelationShips) {
      return manga
    }

    manga.data.attributes.artist = await Promise.all(
      artists.map(({ id }) => UserResolver.getUser(id))
    )
    manga.data.attributes.author = await UserResolver.getUser(author.id)
    manga.data.attributes.cover_art = await Promise.all(
      coverArts.map(({ id }) => CoverArtResolver.getCoverArt(id))
    )

    return manga
  }

  static async getManga(
    mangaId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, artist, author)
       */
      withRelationShips?: false
    }
  ): Promise<MangaResponse>

  static async getManga(
    mangaId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, artist, author)
       */
      withRelationShips?: true
    }
  ): Promise<MangaExtendedResponse>

  /**
   * Get a manga
   * @param mangaId The manga ID
   * @param options Request options
   */
  static async getManga(
    mangaId: string,
    options: {
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: manga } = await Agent.call<
      ApiResponse<{ data: MangaExtended }>
    >(`manga/${mangaId}`)

    if (manga.result === 'error') {
      return manga
    }

    const artists = getRelationshipType('artist', manga.relationships)
    const author = getRelationshipType('author', manga.relationships)[0]
    const coverArts = getRelationshipType('cover_art', manga.relationships)

    if (!options.withRelationShips) {
      return manga
    }

    manga.data.attributes.artist = await Promise.all(
      artists.map(({ id }) => UserResolver.getUser(id))
    )
    manga.data.attributes.author = await UserResolver.getUser(author.id)
    manga.data.attributes.cover_art = await Promise.all(
      coverArts.map(({ id }) => CoverArtResolver.getCoverArt(id))
    )

    return manga
  }

  /**
   * Get manga feed with chapters
   * @param mangaId The manga ID
   * @param options Request Options
   */
  async getMangaFeed(
    mangaId: string,
    options: GetMangaFeedOptions = {}
  ): Promise<MangaFeedResponse> {
    const { data: mangaFeed } = await this.agent.call<MangaFeedResponse>(
      `manga/${mangaId}/feed`,
      {
        params: options
      }
    )

    return mangaFeed
  }

  /**
   * Get manga feed with chapters
   * @param mangaId The manga ID
   * @param options Request Options
   */
  static async getMangaFeed(
    mangaId: string,
    options: GetMangaFeedOptions = {}
  ): Promise<MangaFeedResponse> {
    const { data: mangaFeed } = await Agent.call<MangaFeedResponse>(
      `manga/${mangaId}/feed`,
      {
        params: options
      }
    )

    return mangaFeed
  }

  async search(options: SearchMangaOptions): Promise<MangaList> {
    const { data } = await this.agent.call<MangaList>('manga', {
      params: formatQueryParams(options)
    })

    return data
  }

  static async search(options: SearchMangaOptions): Promise<MangaList> {
    const { data } = await Agent.call<MangaList>('manga', {
      params: formatQueryParams(options)
    })

    return data
  }

  /**
   * Get a list of covers belonging to a manga.
   * @param mangaId The manga ID
   */
  async getMangaCovers(mangaId: string): Promise<CoverArtsResponse> {
    return MangaResolver.getMangaCovers(mangaId)
  }

  /**
   * Get a list of covers belonging to a manga.
   * @param mangaId The manga ID
   */
  static async getMangaCovers(mangaId: string): Promise<CoverArtsResponse> {
    return CoverArtResolver.getCoverArts({ manga: [mangaId] })
  }

  static async getTags(): Promise<ApiResponse<{ data: Tag }>[]> {
    const { data: tags } = await Agent.call<ApiResponse<{ data: Tag }>[]>(
      'manga/tag'
    )

    return tags
  }
}
